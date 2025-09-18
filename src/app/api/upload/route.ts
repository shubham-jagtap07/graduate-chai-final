import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    console.log('=== UPLOAD DEBUG ===');
    console.log('CLOUDINARY_URL exists:', !!process.env.CLOUDINARY_URL);
    console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
    console.log('CLOUDINARY_UPLOAD_FOLDER:', process.env.CLOUDINARY_UPLOAD_FOLDER);
    
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    console.log('File received:', file.name, 'Size:', file.size);

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET; // unsigned preset recommended

    // Prefer signed uploads when CLOUDINARY_URL is provided
    const cloudinaryUrl = process.env.CLOUDINARY_URL; // cloudinary://<api_key>:<api_secret>@<cloud_name>
    if (cloudinaryUrl) {
      try {
        const match = cloudinaryUrl.match(/^cloudinary:\/\/([^:]+):([^@]+)@([^/]+)$/);
        if (!match) throw new Error('Invalid CLOUDINARY_URL format');
        const [, apiKey, apiSecret, urlCloudName] = match;
        const useCloud = cloudName || urlCloudName;
        const timestamp = Math.floor(Date.now() / 1000);
        const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || '';

        // Build signature string per Cloudinary spec: sorted params concatenated with api_secret
        // Params we sign: folder (if provided) and timestamp
        const toSign = [
          folder ? `folder=${folder}` : '',
          `timestamp=${timestamp}`,
        ]
          .filter(Boolean)
          .join('&');
        const signature = crypto
          .createHash('sha1')
          .update(`${toSign}${apiSecret}`)
          .digest('hex');

        const cloudUrl = `https://api.cloudinary.com/v1_1/${useCloud}/image/upload`;
        const body = new FormData();
        body.append('file', file);
        body.append('timestamp', String(timestamp));
        body.append('api_key', apiKey);
        body.append('signature', signature);
        if (folder) body.append('folder', folder);

        console.log('Uploading to Cloudinary (signed):', cloudUrl);
        const res = await fetch(cloudUrl, { method: 'POST', body });
        const json = await res.json();
        console.log('Cloudinary response status:', res.status);
        console.log('Cloudinary response:', json);
        
        if (!res.ok) {
          console.error('Cloudinary (signed) upload error:', json);
          return NextResponse.json(
            { success: false, message: json?.error?.message || 'Upload failed' },
            { status: 502 }
          );
        }
        const url = json.secure_url || json.url;
        if (!url) {
          return NextResponse.json({ success: false, message: 'Upload failed: no URL returned' }, { status: 502 });
        }
        return NextResponse.json({ success: true, url, asset_id: json.asset_id, public_id: json.public_id });
      } catch (e) {
        console.error('Signed upload path failed, falling back to unsigned/local:', e);
        // continue to unsigned or local below
      }
    }

    if (cloudName && uploadPreset) {
      // Forward to Cloudinary unsigned upload API
      const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const cloudForm = new FormData();
      cloudForm.append('file', file);
      cloudForm.append('upload_preset', uploadPreset);
      if (process.env.CLOUDINARY_UPLOAD_FOLDER) {
        cloudForm.append('folder', process.env.CLOUDINARY_UPLOAD_FOLDER);
      }

      const res = await fetch(cloudUrl, { method: 'POST', body: cloudForm });
      const json = await res.json();

      if (!res.ok) {
        console.error('Cloudinary upload error:', json);
        return NextResponse.json(
          { success: false, message: json?.error?.message || 'Upload failed' },
          { status: 502 }
        );
      }

      const url = json.secure_url || json.url;
      if (!url) {
        return NextResponse.json({ success: false, message: 'Upload failed: no URL returned' }, { status: 502 });
      }

      return NextResponse.json({ success: true, url, asset_id: json.asset_id, public_id: json.public_id });
    }

    // If we're in production and Cloudinary isn't configured, fail fast with a helpful error
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          success: false,
          message:
            'Cloudinary is not configured on the server. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME + CLOUDINARY_UPLOAD_PRESET (and optional CLOUDINARY_UPLOAD_FOLDER).',
        },
        { status: 500 },
      );
    }

    // Development fallback: write to local filesystem
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'images');
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
    } catch (_) {}

    const originalName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
    const ext = originalName.includes('.') ? originalName.substring(originalName.lastIndexOf('.')) : '';
    const base = originalName.replace(ext, '') || 'upload';
    const unique = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const fileName = `${base}_${unique}${ext}`;

    const filePath = path.join(uploadsDir, fileName);
    await fs.writeFile(filePath, buffer);

    // Build absolute URL using the request origin to avoid confusion when clients run on a different domain/port
    let origin;
    try {
      origin = req.url && req.url !== 'null' ? new URL(req.url).origin : null;
    } catch (e) {
      origin = null;
    }
    origin = origin || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const url = `${origin}/images/${fileName}`;
    return NextResponse.json({ success: true, url, fileName });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}


