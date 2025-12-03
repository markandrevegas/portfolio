// composables/useUnsplash.ts
export const useUnsplash = () => {
	const getRandomPhoto = async (params = {}) => {
		try {
			const photo = await $fetch("/api/unsplash/random", {
				query: params
			})
			return { data: photo, error: null }
		} catch (err) {
			return { data: null, error: err }
		}
	}

	return { getRandomPhoto }
}
