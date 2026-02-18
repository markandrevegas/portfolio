export const useWpApi = () => {
  const config = useRuntimeConfig()
	const wpBase = config.public.wpBase

  const fetchFromWp = async (endpoint: string, options = {}) => {

		if (!wpBase) {
			throw new Error("WP Base URL is undefined.")
		}
		const url = `${wpBase}/wp-json/wp/v2/${endpoint}`

		return await $fetch(url, { ...options })
	}

  return { fetchFromWp }
}
