const fs = require('fs');
const path = require('path');

// Create a minimal valid ICO file (16x16 transparent)
const icoHeader = Buffer.from([
  0x00, 0x00, // Reserved
  0x01, 0x00, // Type (1 = ICO)
  0x01, 0x00, // Number of images
]);

const icoEntry = Buffer.from([
  0x10, // Width (16)
  0x10, // Height (16)
  0x00, // Color count (0 = no palette)
  0x00, // Reserved
  0x01, 0x00, // Color planes
  0x20, 0x00, // Bits per pixel (32)
  0x00, 0x04, 0x00, 0x00, // Size of image data (1024 bytes)
  0x16, 0x00, 0x00, 0x00, // Offset to image data
]);

// BMP header for 16x16 32-bit image
const bmpHeader = Buffer.from([
  0x28, 0x00, 0x00, 0x00, // Header size
  0x10, 0x00, 0x00, 0x00, // Width
  0x20, 0x00, 0x00, 0x00, // Height (double for ICO)
  0x01, 0x00, // Planes
  0x20, 0x00, // Bits per pixel
  0x00, 0x00, 0x00, 0x00, // Compression
  0x00, 0x04, 0x00, 0x00, // Image size
  0x00, 0x00, 0x00, 0x00, // X pixels per meter
  0x00, 0x00, 0x00, 0x00, // Y pixels per meter
  0x00, 0x00, 0x00, 0x00, // Colors used
  0x00, 0x00, 0x00, 0x00, // Important colors
]);

// Create 16x16 transparent pixels (BGRA format)
const pixelData = Buffer.alloc(16 * 16 * 4, 0); // All transparent

// Create AND mask (all 0s for transparent)
const andMask = Buffer.alloc(16 * 16 / 8, 0);

// Combine all parts
const icoData = Buffer.concat([
  icoHeader,
  icoEntry,
  bmpHeader,
  pixelData,
  andMask
]);

// Write the ICO file
const faviconPath = path.join(__dirname, 'src', 'app', 'favicon.ico');
fs.writeFileSync(faviconPath, icoData);
console.log('Created valid favicon.ico');
