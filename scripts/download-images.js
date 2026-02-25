// scripts/download-images.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const imagesDir = path.join(process.cwd(), 'public/images')

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(imagesDir, filename)
    
    // Skip if already downloaded
    if (fs.existsSync(filepath)) {
      console.log(`✓ Skipped (exists): ${filename}`)
      resolve(filepath)
      return
    }

    const protocol = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(filepath)

    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`))
        return
      }

      response.pipe(file)

      file.on('finish', () => {
        file.close()
        console.log(`✓ Downloaded: ${filename}`)
        resolve(filepath)
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete partial file
      reject(err)
    })
  })
}

function extractImageUrls(obj, urls = new Set()) {
  if (!obj || typeof obj !== 'object') return urls

  // Check for image URL patterns
  if (typeof obj === 'string' && obj.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    urls.add(obj)
  }

  // Common WordPress image fields
  if (obj.url && typeof obj.url === 'string') {
    urls.add(obj.url)
  }
  if (obj.source_url && typeof obj.source_url === 'string') {
    urls.add(obj.source_url)
  }

  // Recursively search nested objects and arrays
  Object.values(obj).forEach(value => {
    if (Array.isArray(value)) {
      value.forEach(item => extractImageUrls(item, urls))
    } else if (typeof value === 'object') {
      extractImageUrls(value, urls)
    }
  })

  return urls
}

function getFilenameFromUrl(url) {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const filename = pathname.split('/').pop()
    return filename || 'image.jpg'
  } catch {
    return 'image.jpg'
  }
}

async function processJsonFile(filename) {
  const filepath = path.join(process.cwd(), 'public/data', filename)
  
  if (!fs.existsSync(filepath)) {
    console.log(`⚠ Skipped: ${filename} not found`)
    return []
  }

  console.log(`\nProcessing ${filename}...`)
  const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'))
  
  // Extract all image URLs from the JSON
  const imageUrls = extractImageUrls(data)
  console.log(`Found ${imageUrls.size} images in ${filename}`)

  // Download all images
  const downloads = Array.from(imageUrls).map(url => {
    const filename = getFilenameFromUrl(url)
    return downloadImage(url, filename).catch(err => {
      console.error(`✗ Failed to download ${url}:`, err.message)
      return null
    })
  })

  return Promise.all(downloads)
}

async function main() {
  console.log('Starting image download...\n')

  const jsonFiles = [
    'pages.json',
    'hero.json',
    'bio.json',
    'contact.json',
    'feature.json'
  ]

  for (const file of jsonFiles) {
    await processJsonFile(file)
  }

  console.log('\n✓ Image download complete!')
}

main().catch(console.error)