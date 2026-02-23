import { writeFile } from 'node:fs/promises'
import 'dotenv/config'

const BASE = process.env.WP_BASE_URL

if (!BASE) {
  console.error('Missing WP_BASE_URL in .env')
  process.exit(1)
}

const DATA_TYPES = [
  'pages',
  'bio',
  'contact',
  'feature',
  'gallery',
  'hero',
  'projectpost'
]

async function fetchPostTypes() {
  const res = await fetch(`${BASE}/wp-json/wp/v2/types`)
  if (!res.ok) throw new Error('Failed to fetch post types')

  const types = await res.json()
  const fetchable = Object.values(types)
    .filter(t => t.rest_base && DATA_TYPES.includes(t.rest_base))
    .map(t => t.rest_base)

  return fetchable
}

async function fetchAll(type) {
  const perPage = 100
  let page = 1
  let results = []

  while (true) {
    const res = await fetch(
      `${BASE}/wp-json/wp/v2/${type}?per_page=${perPage}&page=${page}&_embed`
    )
    if (!res.ok) break

    const data = await res.json()
    if (!data.length) break

    results = results.concat(data)
    page++
  }

  return results
}

function extractFeaturedImage(post) {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  if (!media) return null

  return {
    id: media.id,
    url: media.source_url,
    alt: media.alt_text || '',
    width: media.media_details?.width ?? null,
    height: media.media_details?.height ?? null
  }
}

function transform(post) {
  return {
    id: post.id,
    slug: post.slug,
    type: post.type,
    date: post.date,
    title: post.title?.rendered ?? '',
    excerpt: post.excerpt?.rendered ?? '',
    content: post.content?.rendered ?? '',
    featuredImage: extractFeaturedImage(post),
    acf: post.acf ?? {}
  }
}

async function run() {
  console.log('Fetching post types...')
  const postTypes = await fetchPostTypes()

  const content = {}

  for (const type of postTypes) {
    console.log(`Fetching ${type}...`)
    const items = await fetchAll(type)
    content[type] = items.map(transform)
  }

  const output = {
    meta: { generatedAt: new Date().toISOString() },
    content
  }

  await writeFile('./public/content.json', JSON.stringify(output, null, 2))
  console.log('Export complete → public/content.json')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})