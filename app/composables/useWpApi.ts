/*export const useWpApi = () => {
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
*/
// composables/useWpApi.ts
export const useWpApi = () => {
	// Add <T> before the parentheses
	const config = useRuntimeConfig()

	const fetchFromWp = <T>(endpoint: string, options?: any) => {
		const baseURL = import.meta.server ? config.public.wpBase : config.public.apiPrefix

		return $fetch<T>(`${baseURL}/wp-json/wp/v2/${endpoint}`, options)
	}

	return { fetchFromWp }
}
