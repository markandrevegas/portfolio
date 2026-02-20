export const useWpApi = () => {
  const config = useRuntimeConfig()

  const fetchFromWp = async <T>(endpoint: string, options?: any) => {
    // Ensure we pick the right source
    const baseUrl = import.meta.server 
      ? config.public.wpBase 
      : config.public.apiPrefix

    try {
      return await $fetch<T>(`${baseUrl}/wp-json/wp/v2/${endpoint}`, {
        ...options,
        // Optional: add a timeout so the build doesn't hang forever on a bad API
        timeout: 10000 
      })
    } catch (err: any) {
      // Log the specific URL that failed to help debug the build
      console.error(`[WP API Error] Failed to fetch: ${baseUrl}/wp-json/wp/v2/${endpoint}`)
      
      // Throw a structured error that Nuxt's error.vue can catch
      throw createError({
        statusCode: err.response?.status || 500,
        statusMessage: `WordPress API Error: ${err.message}`,
        fatal: true
      })
    }
  }

  return { fetchFromWp }
}