// scripts/generate-latest-page.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesPath = path.join(__dirname, '../public/data/pages.json');
const firstPagePath = path.join(__dirname, '../public/data/latest-page.json');

const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf-8'));

const firstPage = pages
  .filter(page => page.type === 'page' && page.status === 'publish')
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]

if (firstPage) {
  const firstPageData = {
    id: firstPage.id,
    slug: firstPage.slug,
    date: firstPage.date,
    title: firstPage.title.rendered,
    acf: {
      title: firstPage.acf?.title || firstPage.title.rendered,
      teaser: firstPage.acf?.excerpt || '',
      image: firstPage.acf?.image || null
    }
  };

  fs.writeFileSync(firstPagePath, JSON.stringify(firstPageData, null, 2));
  console.log(`✓ Generated latest page: "${firstPageData.title}"`);
} else {
  console.log('✗ No published pages found');
}