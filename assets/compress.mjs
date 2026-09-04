
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Disable sharp cache on Windows so files aren't held open
sharp.cache(false);

// Path to the kabim photos directory
const dir = path.join(process.cwd(), 'assets', 'kabim');

async function compressImages() {
  try {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp') && !f.startsWith('temp_'));
    console.log(`Found ${files.length} .webp files in ${dir}`);

    for (const file of files) {
      const filePath = path.join(dir, file);

      // 1. Read into buffer (avoids file lock on Windows)
      const inputBuffer = fs.readFileSync(filePath);
      const oldSize = inputBuffer.length;

      // 2. Compress via sharp in memory
      const outputBuffer = await sharp(inputBuffer)
        .resize({ width: 400 }) // 2x display size for high-DPI
        .webp({ quality: 65, effort: 6 })
        .toBuffer();

      // 3. Overwrite file directly with buffer
      fs.writeFileSync(filePath, outputBuffer);

      console.log(`Optimized ${file}: ${(oldSize / 1024).toFixed(2)} KB -> ${(outputBuffer.length / 1024).toFixed(2)} KB`);
    }
    console.log('✅ All images compressed successfully.');
  } catch (error) {
    console.error('❌ Error compressing images:', error);
  }
}

compressImages();

