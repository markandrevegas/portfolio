<script setup>
import { useUnsplash } from "~/composables/useUnsplash"
import block from '~/content/blocks/image.json'

import { ref, onMounted, provide } from "vue"

// state
const loading = ref(false)
const photo = ref(null)
const contentError = ref(null)
const header = block.header
const text = block.text

provide("photo", photo)
provide("header", header)
provide("text", text)
provide("loading", loading)

const loadPhoto = async () => {
	loading.value = true
	const { getRandomPhoto } = useUnsplash()

	const { data, error: fetchError } = await getRandomPhoto({
		query: "fashion",
		orientation: "portrait"
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
	<div class="flex-1 flex flex-col h-screen overflow-auto">
		<Hero />
		<div>
			<Grid />
      <div class="h-[100vh] flex items-center justify-center">
        <p class="text-xl">Scroll down for more...</p>
      </div>
      <p>More content after the filler to ensure scrollability!</p>
    </div>
	</div>
</template>
<style></style>
