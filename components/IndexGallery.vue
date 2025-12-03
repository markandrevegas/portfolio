<script setup lang="ts">
	import { ref, onMounted } from "vue"
	import { useUnsplash } from "~/composables/useUnsplash"
	// states
  const images = ref<{ src: string; alt: string }[]>([])
	const isLoading = ref(true)

	// helpers
	const { getRandomPhoto } = useUnsplash()
	async function fetchImages() {
    isLoading.value = true

    const params = {
      query: "fashion",
      orientation: "portrait",
      content_filter: "high"
    }

    const results = []

    for (let i = 0; i < 5; i++) {
      const { data } = await getRandomPhoto(params)
      if (data) {
        results.push({
          src: data.urls?.regular,
          alt: data.alt_description || "Unsplash image"
        })
      }
    }

    images.value = results
    isLoading.value = false
  }

	onMounted(() => {
		fetchImages()
	})
</script>
<template>
	<div>
		<h2 v-if="images.length > 0" class="text-2xl uppercase font-medium italic mb-8">Handmade Illusions</h2>
		<div class="flex justify-start gap-4 w-full overflow-x-scroll">
			<div v-if="isLoading">Loading...</div>
			<NuxtImg v-for="(img, index) in images" :key="index" :src="img.src" :alt="img.alt" class="h-72" />
		</div>
		<div v-if="!isLoading && images.length === 0" class="text-center mt-4">No images found.</div>
	</div>
  
</template>