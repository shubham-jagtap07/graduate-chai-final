import { NextResponse } from 'next/server';
// We no longer write to local filesystem; uploads are forwarded to Cloudinary.

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

    if (!cloudName || !uploadPreset) {
      return NextResponse.json(
        {
          success: false,
          message: 'Upload service not configured. Missing CLOUDINARY_CLOUD_NAME or CLOUDINARY_UPLOAD_PRESET.',
        },
        { status: 500 }
      );
    }

    // Forward to Cloudinary unsigned upload API
    const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const cloudForm = new FormData();
    cloudForm.append('file', file);
    cloudForm.append('upload_preset', uploadPreset);
    // Optional: set a folder
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
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}

