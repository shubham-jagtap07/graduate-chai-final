import { NextResponse } from 'next/server';

export async function GET() {
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';
  
  try {
    const response = await fetch(`${backendUrl}/api/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    const data = await response.json().catch(() => null);
    
    return NextResponse.json({
      success: true,
      frontend: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV,
      },
      backend: {
        url: backendUrl,
        status: response.status,
        reachable: response.ok,
        data: data,
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      frontend: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV,
      },
      backend: {
        url: backendUrl,
        status: 'unreachable',
        error: error.message,
      }
    }, { status: 502 });
  }
}
