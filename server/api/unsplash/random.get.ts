// server/api/unsplash/random.get.ts
import { defineEventHandler, sendError, createError, getQuery, H3Event } from "h3"

interface UnsplashPhoto {
	id: string
	alt_description: string | null
	urls: {
		raw: string
		full: string
		regular: string
		small: string
		thumb: string
	}
	blur_hash: string
}

interface QueryParams {
	query?: string
	orientation?: string
	content_filter?: string
}

export default defineEventHandler(async (event: H3Event) => {
	const UNSPLASH_KEY: string | undefined = process.env.NUXT_UNSPLASH_ACCESS_KEY
	const UNSPLASH_BASE: string = process.env.NUXT_UNSPLASH_BASE || "https://api.unsplash.com"

	try {
		const query = getQuery(event) as QueryParams

		const params = new URLSearchParams({
			query: query.query || "fashion",
			orientation: query.orientation || "portrait",
			content_filter: query.content_filter || "high",
			count: "1"
		})

		const url = `${UNSPLASH_BASE}/photos/random?${params.toString()}`

		const res = await fetch(url, {
			headers: {
				Authorization: `Client-ID ${UNSPLASH_KEY}`
			}
		})

		if (!res.ok) {
			const msg = await res.text()
			throw createError({
				statusCode: res.status,
				statusMessage: msg
			})
		}

		const json = await res.json()
		const photo: UnsplashPhoto = Array.isArray(json) ? json[0] : json

		return {
			id: photo.id,
			alt: photo.alt_description || "",
			urls: photo.urls,
			blurhash: photo.blur_hash
		}
	} catch (err) {
		sendError(event, err)
	}
})
