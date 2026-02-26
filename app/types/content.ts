export interface FeaturedImage {
  id: number
  url: string
  alt: string
  width: number | null
  height: number | null
}

export interface ContentItem {
  id: number
  slug: string
  type: string
  date: string
  title: string
  excerpt: string
  content: string
  featuredImage: FeaturedImage | null
  acf: Record<string, any>
}

export interface ContentJson {
  meta: {
    generatedAt: string
  }
  content: Record<string, ContentItem[]>
}