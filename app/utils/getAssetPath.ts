export function getAssetPath(path: string) {
  const config = useRuntimeConfig()
  const base = config.public.baseURL.replace(/\/$/, '')
  return `${base}${path}`
}