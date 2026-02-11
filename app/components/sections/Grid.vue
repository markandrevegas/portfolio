<script setup lang="ts">
	import { ref, onMounted } from "vue"
	import { useUnsplash } from "../../composables/useUnsplash"

  const images = ref<{ src: string; alt: string }[]>([])
	const isLoading = ref(true)
  const loadingIconWidth = "2.5rem"
  const loadingIconHeight = "2.5rem"

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
	<div class="flex-1 flex flex-col justify-center items-center">
		<!-- Loading State -->
		<Loading v-if="isLoading" :width="loadingIconWidth" :height="loadingIconHeight" />
		<!-- Empty State -->
		<div v-else-if="images.length === 0" class="text-center mt-4">No images found.</div>
		<!-- Images Grid -->
		<div v-else class="p-8">
			<h2 class="text-2xl uppercase font-medium italic mb-8">Handmade Illusions</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
				<NuxtImg v-for="(img, index) in images" :key="index" :src="img.src" :alt="img.alt" class="h-72" />
			</div>
		</div>
	</div>
</template>