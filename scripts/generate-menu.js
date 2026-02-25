// scripts/generate-menu.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesPath = path.join(__dirname, '../public/data/pages.json');
const menuPath = path.join(__dirname, '../public/data/menu.json');

const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf-8'));

const menu = pages
  .filter(page => page.type === 'page')
  .map(page => ({
    title: page.title.rendered,
    url: `/${page.slug}`
  }));

fs.writeFileSync(menuPath, JSON.stringify(menu, null, 2));
console.log(`✓ Generated menu with ${menu.length} items`);