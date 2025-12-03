<script setup>
import { useUnsplash } from "@/composables/useUnsplash"
import block from '~/content/blocks/image.json'

import { ref, onMounted } from "vue"

// state
const loading = ref(false)
const photo = ref(null)
const contentError = ref(null)
const header = block.header
const text = block.text

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
	<div class="flex-1 flex flex-col bg-red-100 h-screen overflow-auto">
		<div class="h-screen relative ">
			<div v-if="loading">Loading...</div>
			<NuxtImg v-if="photo" :src="photo.urls.full" :alt="photo.alt" class="w-full h-full object-cover z-0" />
			<div class="h-48 absolute right-0 bottom-0 left-0 z-10 p-6 text-white">
				<h1 class="text-4xl font-bold">{{ header }}</h1>
				<p class="mt-2 max-w-md">{{ text }}</p>
			</div>
		</div>
		<div class="bg-white p-12 text-gray-800">
      <h2 class="text-3xl font-semibold mb-4">More Scrollable Content</h2>
      <p>This is where the user will scroll to view the main body of your page. The content has pushed the full-screen image up.</p>
      <div class="h-[100vh] flex items-center justify-center">
        <p class="text-xl">Scroll down for more...</p>
      </div>
      <p>More content after the filler to ensure scrollability!</p>
    </div>
	</div>
</template>
<style></style>
