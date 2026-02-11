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
			getCachedData: () => undefined,
			server: false,
			lazy: true
		})
	}

	return {
		getEntry
	}
}
