<script setup>
import { ref, onMounted, provide, computed } from "vue"

import { useUnsplash } from "~/composables/useUnsplash"
import { useOnePager } from "~/composables/useOnePager"
const { data: onePager } = await useOnePager()

import block from "~/content/blocks/image.json"
// state
const loading = ref(false)
const photo = ref(null)
const contentError = ref(null)
const header = block.header
const text = block.text

// Map Contentful `onePager` to only the fields components need and provide that
const contentData = computed(() => {
	const entry = onePager?.value
	const fields = entry?.fields
	console.log("Raw Contentful Entry:", entry) // Debug log
	if (!fields) return null

	const title = fields?.title?.fields.title ?? "Default Title"
	const teaser = fields.teaser?.fields?.teaser ?? "Default teaser text goes here."
	console.log("Extracted Title:", title) // Debug log
	console.log("Extracted Teaser:", teaser) // Debug log

	const heroAsset = fields.image ?? null
	const heroImage = heroAsset?.fields?.image?.fields?.file?.url ? "https:" + heroAsset.fields.image.fields.file.url : (heroAsset?.fields?.image?.fields?.file?.url ?? null)

	console.log("Extracted Hero Image URL:", heroImage) // Debug log

	return {
		title,
		teaser,
		heroImage
	}
})

provide("contentData", contentData)
provide("photo", photo)
provide("header", header)
provide("text", text)
provide("loading", loading)

const loadPhoto = async () => {
	loading.value = true
	const { getRandomPhoto } = useUnsplash()

	const { data, error: fetchError } = await getRandomPhoto({
		query: "fashion",
		orientation: "landscape"
	})

	loading.value = false

	if (fetchError) {
		contentError.value = fetchError
		return
	}

	photo.value = data
}

onMounted(() => {
	loadPhoto()
})
</script>

<template>
	<div class="flex h-screen flex-1 flex-col overflow-auto">
		<Hero />
		<Grid />
		<About />
		<Contact />
	</div>
</template>
