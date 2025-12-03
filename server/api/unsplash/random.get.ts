// server/api/unsplash/random.get.ts
import { defineEventHandler, sendError, createError, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
	const UNSPLASH_KEY = process.env.NUXT_UNSPLASH_ACCESS_KEY
	const UNSPLASH_BASE = process.env.NUXT_UNSPLASH_BASE || "https://api.unsplash.com"

	try {
		const query = getQuery(event)

		const params = new URLSearchParams({
			query: query.query || "nature",
			orientation: query.orientation || "landscape",
			content_filter: "high",
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
		const photo = Array.isArray(json) ? json[0] : json

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