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
