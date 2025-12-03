// composables/useUnsplash.ts
export const useUnsplash = () => {

	const CACHE_DURATION = 60 * 60 * 1000 
	/**
	 * Generates a unique key for localStorage based on the query parameters.
	 * This ensures different searches/orientations have different cached results.
	 */
	const getCacheKey = (params: Record<string, any>): string => {
		// Use a combination of 'query' and 'orientation' if they exist, otherwise use defaults.
		const query = params.query || "fashion"
		const orientation = params.orientation || "portrait"
		return `unsplash_cache_${query}_${orientation}`
	}
	
	/**
	 * Fetches a random Unsplash photo, utilizing localStorage for caching.
	 * * @param {object} params - The query parameters (e.g., { query: 'cats', orientation: 'landscape' }).
	 * @returns {Promise<{ data: object | null, error: any | null }>} 
	 */
	const getRandomPhoto = async (params: Record<string, any> = {}) => {
		const key = getCacheKey(params)
		
		// 1. CHECK CACHE (Only runs in the browser/client-side)
		if (import.meta.client) { 
			const cachedData = localStorage.getItem(key)
			if (cachedData) {
				try {
					const { photo, timestamp } = JSON.parse(cachedData)
					const now = new Date().getTime()

					if (now - timestamp < CACHE_DURATION) {
						console.log(`[useUnsplash] Using cached photo for key: ${key}`)
						return { data: photo, error: null }
					} else {
						console.log(`[useUnsplash] Cache expired for key: ${key}`)
						localStorage.removeItem(key)
					}
				} catch (e) {
					console.error('[useUnsplash] Error parsing cached data, fetching new.', e)
					localStorage.removeItem(key)
				}
			}
		}

		try {
			console.log(`[useUnsplash] Fetching new photo from API for key: ${key}`)
			
			const photo = await $fetch("/api/unsplash/random", {
				query: params
			})
			
			// 4. UPDATE CACHE
			if (import.meta.client) {
				const now = new Date().getTime()
				const dataToCache = {
					photo: photo,
					timestamp: now
				}
				localStorage.setItem(key, JSON.stringify(dataToCache))
				console.log(`[useUnsplash] New photo cached for key: ${key}`)
			}
			
			return { data: photo, error: null }
		} catch (err) {
			console.error("[useUnsplash] API fetch failed:", err)
			return { data: null, error: err }
		}
	}

	return { getRandomPhoto }
}