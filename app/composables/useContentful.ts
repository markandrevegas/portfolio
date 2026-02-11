// composables/useContentful.ts
import { createClient } from "contentful"
import type { EntrySkeletonType } from "contentful"

export const useContentful = () => {
	const config = useRuntimeConfig()

	const spaceId = config.public.contentfulSpaceId
	const accessToken = config.public.contentfulAccessToken

	if (!spaceId || !accessToken) {
		throw new Error("Contentful configuration missing")
	}

	const client = createClient({
		space: spaceId,
		accessToken
	})

	const getEntry = <T extends EntrySkeletonType>(id: string) => {
		return useAsyncData("contentful-entry-" + id, () => client.getEntry<T>(id), {
			// Fetch on server so content is available during SSR
			server: true,
			// Do not use lazy here so the data is resolved immediately
			lazy: false
		})
	}

	return {
		getEntry
	}
}
