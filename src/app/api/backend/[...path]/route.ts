import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Target backend URL. Prefer BACKEND_URL (server-side only) and fallback to NEXT_PUBLIC_BACKEND_URL.
const BACKEND_BASE = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';

async function proxy(req: NextRequest, { params }: { params: { path: string[] } }) {
  const targetPath = params.path?.join('/') || '';
  const url = `${BACKEND_BASE}/api/${targetPath}`;
  const isProd = process.env.NODE_ENV === 'production';
  
  // Enhanced logging for debugging
  console.log(`[PROXY] ${req.method} ${req.url} -> ${url}`);
  console.log(`[PROXY] BACKEND_BASE: ${BACKEND_BASE}`);
  console.log(`[PROXY] NODE_ENV: ${process.env.NODE_ENV}`);
  
  if (isProd && /localhost|127\.0\.0\.1/.test(BACKEND_BASE)) {
    console.error(`[PROXY] Production misconfiguration: BACKEND_BASE=${BACKEND_BASE}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Server proxy misconfigured: BACKEND_URL must be a public URL in production.',
        debug: { BACKEND_BASE, NODE_ENV: process.env.NODE_ENV }
      },
      { status: 500 }
    );
  }

  const init: RequestInit = {
    method: req.method,
    redirect: 'manual',
  };

  // Forward body only for methods that can have a body
  const method = req.method?.toUpperCase();
  if (method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await req.json().catch(() => null);
      init.body = body ? JSON.stringify(body) : undefined;
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData().catch(() => null);
      if (formData) {
        const params = new URLSearchParams();
        formData.forEach((v, k) => params.append(k, String(v)));
        init.body = params;
      }
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData().catch(() => null);
      if (formData) {
        init.body = formData as any;
      }
    } else {
      const text = await req.text().catch(() => null);
      init.body = text ?? undefined;
    }
  }

  // Ensure host header matches target
  const h = new Headers(req.headers);
  h.delete('host');
  // Avoid upstream compression mismatches
  h.set('accept-encoding', 'identity');
  init.headers = h;

  try {
    console.log(`[PROXY] Fetching: ${url} with method: ${req.method}`);
    const resp = await fetch(url, init);
    console.log(`[PROXY] Response status: ${resp.status} ${resp.statusText}`);

    // Stream response back with same status and headers
    const resHeaders = new Headers(resp.headers);
    // Remove encoding/length headers because we're reserializing the body
    resHeaders.delete('content-encoding');
    resHeaders.delete('transfer-encoding');
    resHeaders.delete('content-length');
    // Allow cookies/credentials to flow if backend sets them
    resHeaders.set('access-control-expose-headers', '*');
    // Debug headers to help diagnose proxy issues in Network tab
    resHeaders.set('x-proxy-target', url);
    resHeaders.set('x-proxy-backend-base', BACKEND_BASE);
    // Add cache control to prevent browser caching issues
    resHeaders.set('cache-control', 'no-cache, no-store, must-revalidate');
    resHeaders.set('pragma', 'no-cache');
    resHeaders.set('expires', '0');

    const contentType = resp.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await resp.json().catch((e) => {
        console.error(`[PROXY] JSON parse error:`, e);
        return null;
      });
      console.log(`[PROXY] JSON response data:`, data);
      return NextResponse.json(data, { status: resp.status, headers: resHeaders });
    }

    const text = await resp.text();
    console.log(`[PROXY] Text response:`, text.substring(0, 200));
    return new NextResponse(text, { status: resp.status, headers: resHeaders });
  } catch (error: any) {
    console.error(`[PROXY] Error:`, error);
    const message = error?.message || 'Proxy error';
    const errHeaders = new Headers();
    errHeaders.set('x-proxy-target', url);
    errHeaders.set('x-proxy-backend-base', BACKEND_BASE);
    errHeaders.set('x-proxy-error', message);
    errHeaders.set('access-control-expose-headers', '*');
    errHeaders.set('cache-control', 'no-cache, no-store, must-revalidate');
    
    return NextResponse.json({ 
      success: false, 
      message, 
      target: url,
      debug: {
        BACKEND_BASE,
        NODE_ENV: process.env.NODE_ENV,
        error: error.toString()
      }
    }, { status: 502, headers: errHeaders });
  }
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE };
