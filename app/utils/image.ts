// utils/image.ts
export interface WpImageSizes {
  thumbnail: string
  'thumbnail-width': number
  'thumbnail-height': number
  medium: string
  'medium-width': number
  'medium-height': number
  medium_large: string
  'medium_large-width': number
  'medium_large-height': number
  large: string
  'large-width': number
  'large-height': number
  '1536x1536': string
  '1536x1536-width': number
  '1536x1536-height': number
  '2048x2048': string
  '2048x2048-width': number
  '2048x2048-height': number
}

export interface ResponsiveImage {
  mobile: {
    src: string
    width: number
    height: number
  }
  tablet: {
    src: string
    width: number
    height: number
  }
  desktop: {
    src: string
    width: number
    height: number
  }
  srcset: string
  sizes: string
}

export function getResponsiveImage(sizes: WpImageSizes): ResponsiveImage {
  const srcset = [
    `${sizes.medium} ${sizes['medium-width']}w`,
    `${sizes.medium_large} ${sizes['medium_large-width']}w`,
    `${sizes.large} ${sizes['large-width']}w`,
    `${sizes['1536x1536']} ${sizes['1536x1536-width']}w`,
    `${sizes['2048x2048']} ${sizes['2048x2048-width']}w`
  ].join(', ')

  const sizesAttr = '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1536px'

  return {
    mobile: {
      src: sizes.medium,
      width: sizes['medium-width'],
      height: sizes['medium-height']
    },
    tablet: {
      src: sizes.medium_large,
      width: sizes['medium_large-width'],
      height: sizes['medium_large-height']
    },
    desktop: {
      src: sizes['1536x1536'],
      width: sizes['1536x1536-width'],
      height: sizes['1536x1536-height']
    },
    srcset,
    sizes: sizesAttr
  }
}

export function generateSrcset(sizes: WpImageSizes): string {
  return [
    `${sizes.medium} ${sizes['medium-width']}w`,
    `${sizes.medium_large} ${sizes['medium_large-width']}w`,
    `${sizes.large} ${sizes['large-width']}w`,
    `${sizes['1536x1536']} ${sizes['1536x1536-width']}w`,
    `${sizes['2048x2048']} ${sizes['2048x2048-width']}w`
  ].join(', ')
}