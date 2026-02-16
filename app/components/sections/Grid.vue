<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useWpApi } from "../../composables/useWpApi"

const { fetchFromWp } = useWpApi()
async function fetchGalleryPage() {
  isLoading.value = true
  try {
	const response = await fetchFromWp('feature', {
			query: { slug: 'latest-designs', _embed: true }
		})
		const page = ((response as unknown) as any[])[0]
		console.log("--- SUCCESS: Page Data ---", page)
		galleryPage.value = page
		console.log("--- SUCCESS: Gallery Page ---", galleryPage.value)
  } catch (error: any) {
    console.error("Fetch Error:", error.data || error.message)
  } finally {
    isLoading.value = false
  }
}

const galleryPage = ref<any>(null)
const isLoading = ref(true)
const loadingIconWidth = "2.5rem"
const loadingIconHeight = "2.5rem"

const images = computed({
  get: () => {
    const results: { src: string; alt: string }[] = []
    if (galleryPage.value?.acf) {
      const acf = galleryPage.value.acf
      Object.keys(acf)
        .filter(key => key.startsWith('image'))
        .forEach(key => {
          if (acf[key]) {
            results.push({
              src: acf[key].url,
              alt: acf[key].alt || acf[key].title || ''
            })
          }
        })
    }
    return results
  },
  set: (newImages: { src: string; alt: string }[]) => {
    // optionally update galleryPage or just store somewhere else
    console.log("New images set:", newImages)
  }
})

onMounted(() => {
	fetchGalleryPage()
})
</script>
<template>
	<div class="flex flex-1 flex-col">
		<!-- Loading State -->
		<Loading v-if="isLoading" :width="loadingIconWidth" :height="loadingIconHeight" />
		<!-- Empty State -->
		<div v-else-if="images.length === 0" class="mt-4 text-center">No images found.</div>
		<!-- Images Grid -->
		<div v-else class="wrapper">
			<div class="wrapper-grid">
				<div>
					<h2 class="mb-8 font-medium">Handmade Illusions</h2>
				</div>
				<div>
					<p class="text-right">Photos from Unsplash Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid debitis ut pariatur facere quam</p>
				</div>
				<div class="lg:place-self-end"><p class="text-right">View all</p></div>
			</div>
			<div class="wrapper-grid">
				<figure v-for="(img, index) in images" :key="index" class="relative overflow-hidden">
					<picture>
						<NuxtImg :src="img.src" :alt="img.alt" class="w-full object-scale-down" />
					</picture>
					<div class="absolute inset-0 z-20 bg-black/40"></div>
					<figcaption class="absolute bottom-0 left-0 right-0 z-30 block bg-gradient-to-t from-black/40 p-4 pt-24 text-sm font-light capitalize text-white lg:p-8 lg:text-xl">
						<span class="font-semibold">{{ img.alt }}</span
						><br /><span class="opacity-70">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit doloribus exercitationem hic.</span>
					</figcaption>
				</figure>
			</div>
		</div>
	</div>
</template>
