export const useWpApi = () => {
  const config = useRuntimeConfig()

  const fetchFromWp = async (endpoint: string, options = {}) => {
		const baseUrl = config.public.wpBase

		// Check if baseUrl exists to avoid 'undefined'
		if (!baseUrl) {
			throw new Error("WP Base URL is undefined.")
		}
		const url = `${baseUrl}/wp-json/wp/v2/${endpoint}`

		return await $fetch(url, { ...options })
	}

  return { fetchFromWp }
}
