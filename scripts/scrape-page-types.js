// scripts/scrape-page-types.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const WP_BASE_URL = 'https://content.local/wp-json/wp/v2'

async function fetchFromWp(endpoint, params = {}) {
  const url = new URL(`${WP_BASE_URL}/${endpoint}`)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value))
  })
  
  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`)
  }
  return response.json()
}

async function scrapePostType(type) {
  console.log(`Fetching ${type}...`)
  const data = await fetchFromWp(type, { per_page: 100, _embed: true })
  
  const outputPath = path.join(__dirname, `../public/data/${type}.json`)
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
  
  console.log(`✓ Saved ${data.length} ${type} items`)
  return data
}

async function main() {
  const dataDir = path.join(__dirname, '../public/data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  await Promise.all([
    scrapePostType('pages'),
    scrapePostType('hero'),
    scrapePostType('bio'),
    scrapePostType('contact'),
    scrapePostType('feature')
  ])

  console.log('✓ All data scraped successfully')
}

main().catch(console.error)