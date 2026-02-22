export const useWpApi = () => {
  const config = useRuntimeConfig()

  const fetchFromWp = async <T>(endpoint: string, options?: any) => {
    const baseUrl = import.meta.server 
      ? config.public.wpBase 
      : config.public.apiPrefix
		if (import.meta.server) {
			// console.log('--- SERVER SIDE FETCH ---')
			// console.log('Target URL:', baseUrl + '/wp-json/wp/v2/' + endpoint)
		}
    try {
      return await $fetch<T>(baseUrl + '/wp-json/wp/v2/' + endpoint, {
        ...options,
        timeout: 10000 
      })
    } catch (err: any) {
      // console.error('[WP API Error] Failed to fetch: ' + baseUrl + '/wp-json/wp/v2/' + endpoint)
      
      throw createError({
        statusCode: err.response?.status || 500,
        statusMessage:'WordPress API Error: ' + err.message,
        fatal: true
      })
    }
  }
  return { fetchFromWp }
}