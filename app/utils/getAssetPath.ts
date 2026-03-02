export function getAssetPath(path: string) {
  const base = process.env.NODE_ENV === 'production' ? '/portfolio' : ''
  return `${base}${path}`
}