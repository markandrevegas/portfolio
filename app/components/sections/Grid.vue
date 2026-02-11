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
          alt: data.alt || "Unsplash image"
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
	<div class="flex-1 flex flex-col">
		<!-- Loading State -->
		<Loading v-if="isLoading" :width="loadingIconWidth" :height="loadingIconHeight" />
		<!-- Empty State -->
		<div v-else-if="images.length === 0" class="text-center mt-4">No images found.</div>
		<!-- Images Grid -->
		<div v-else class="py-24 flex flex-col gap-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4">
        <div>
          <h2 class="text-2xl uppercase font-medium italic mb-8">Handmade Illusions</h2>
        </div>
        <div class="md:hidden"></div>
        <div>
          <p class="text-right text-sm italic text-gray-500">Photos from Unsplash Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid debitis ut pariatur facere quam</p>
        </div>
      </div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4">
				<figure v-for="(img, index) in images" :key="index" class="relative overflow-hidden">
					<picture>
						<NuxtImg :src="img.src" :alt="img.alt" class="object-scale-down w-full" />
					</picture>
					<div class="absolute inset-0 bg-black/20 z-20"></div>
					<figcaption class="absolute bottom-0 right-0 left-0 p-4 z-30 capitalize text-white text-sm">{{ img.alt }}</figcaption>
				</figure>
			</div>
		</div>
	</div>
</template>