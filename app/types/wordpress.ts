// /types/wordpress.ts
export interface WpImage {
  src: string
  alt: string
}

export interface HeroAcf {
  title: string
  teaser: string
  image: WpImage
}

export interface HeroPost {
  id: number
  acf: HeroAcf
}
