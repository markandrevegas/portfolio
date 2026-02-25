// scripts/rewrite-image-urls.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getFilenameFromUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname.split('/').pop();
  } catch {
    return null;
  }
}

function replaceImageUrls(obj, wpDomain) {
  if (!obj || typeof obj !== 'object') return obj;

  if (typeof obj === 'string' && obj.includes(wpDomain) && obj.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    const filename = getFilenameFromUrl(obj);
    return `/images/${filename}`;
  }

  if (obj.url && typeof obj.url === 'string' && obj.url.includes(wpDomain)) {
    obj.url = `/images/${getFilenameFromUrl(obj.url)}`;
  }

  if (obj.source_url && typeof obj.source_url === 'string' && obj.source_url.includes(wpDomain)) {
    obj.source_url = `/images/${getFilenameFromUrl(obj.source_url)}`;
  }

  Object.keys(obj).forEach(key => {
    if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map(item => replaceImageUrls(item, wpDomain));
    } else if (typeof obj[key] === 'object') {
      obj[key] = replaceImageUrls(obj[key], wpDomain);
    }
  });

  return obj;
}

async function processJsonFile(filename, wpDomain) {
  const filepath = path.join(process.cwd(), 'public/data', filename);
  
  if (!fs.existsSync(filepath)) {
    console.log(`⚠ Skipped: ${filename} not found`);
    return;
  }

  console.log(`Processing ${filename}...`);
  const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  
  const updated = replaceImageUrls(data, wpDomain);
  
  fs.writeFileSync(filepath, JSON.stringify(updated, null, 2));
  console.log(`✓ Updated ${filename}`);
}

async function main() {
  const WP_DOMAIN = 'content.local'; // Change this to your WordPress domain
  
  const jsonFiles = [
    'pages.json',
    'hero.json',
    'bio.json',
    'contact.json',
    'feature.json'
  ];

  for (const file of jsonFiles) {
    await processJsonFile(file, WP_DOMAIN);
  }

  console.log('\n✓ Image URLs rewritten!');
}

main().catch(console.error);