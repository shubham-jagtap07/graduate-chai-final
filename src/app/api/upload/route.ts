import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET; // unsigned preset recommended

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

    const url = `/images/${fileName}`;
    return NextResponse.json({ success: true, url, fileName });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}

