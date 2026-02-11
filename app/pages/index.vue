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
	<div class="flex-1 flex flex-col h-screen overflow-auto">
		<Hero />
		<div>
			<Grid />
      <About />
    </div>
	</div>
</template>
<style></style>
