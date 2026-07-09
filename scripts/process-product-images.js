#!/usr/bin/env node
// One-off script: resize/compress real product photos from "Bouce House Pics/"
// into public/images/products/<slug>/<n>.jpg. Run manually, not part of the build.
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC_DIR = path.join(__dirname, '..', 'Bouce House Pics');
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'products');
const MAX_WIDTH = 1600;
const QUALITY = 82;

// Ordered per-slug filename lists — index+1 becomes the output filename (1.jpg, 2.jpg, ...)
const MAPPING = {
  'marvel-adventures': [
    'Marvel Adventures Front.JPEG',
    'Marvel Adventures Side.JPEG',
    'Marvel Adventures Corner Shot.JPEG',
    'Marvel Adventures Collage.JPEG',
    'Marvel Adventures Inside Shot Slide.JPEG',
    'Marvel Adventures Inside Shot Rockwall.JPEG',
    'Marvel Adventures Inside Shot Obstacle.JPEG',
  ],
  'the-astronaut': [
    'The Astronaut Front Slide Shot.JPEG',
    'The Astronaut Angle Slide Shot.JPEG',
    'The Astronaut Collage.JPEG',
  ],
  'single-princess-waterslide': [
    'Single Princess Waterslide Front Shot.JPEG',
    'Single Princess Waterslide Corner Shot.JPEG',
    'Single Princess Waterslide Corner Shot Stock.PNG',
    'Single Princess Waterslide Collage.JPEG',
  ],
  'double-princess-waterslide': [
    'Double Princess Waterslide Corner Shot.JPEG',
    'Double Princess Waterslide Collage.JPEG',
  ],
  'the-castle': ['The Castle.JPEG'],
  'the-tropical': ['The Tropical.JPEG'],
  'the-sun': ['The Sun.JPEG'],
  'the-sunny-slide': ['The Sunny Slide.JPEG'],
};

async function run() {
  for (const [slug, files] of Object.entries(MAPPING)) {
    const outDir = path.join(OUT_DIR, slug);
    fs.mkdirSync(outDir, { recursive: true });
    for (let i = 0; i < files.length; i++) {
      const srcPath = path.join(SRC_DIR, files[i]);
      const outPath = path.join(outDir, (i + 1) + '.jpg');
      if (!fs.existsSync(srcPath)) {
        console.warn('Missing source file, skipping: ' + srcPath);
        continue;
      }
      await sharp(srcPath)
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: QUALITY })
        .toFile(outPath);
      console.log(files[i] + ' -> ' + outPath);
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
