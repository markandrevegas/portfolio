<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useWpApi } from "../../composables/useWpApi"

const { fetchFromWp } = useWpApi()

const heroContent = ref<any>(null)
const heroImage = ref<any>(null)
const heroSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'
const heroSrcSet = computed(() => {
  if (!heroImage.value || !heroImage.value.sizes) return []

  const sizes = heroImage.value.sizes
  return Object.keys(sizes)
    .filter(key => !key.includes('width') && !key.includes('height')) // skip dimension keys
    .map(key => ({
      src: sizes[key],
      width: sizes[`${key}-width`] || 0,
      height: sizes[`${key}-height`] || 0
    }))
})
const heroWidth = computed(() => heroImage.value?.sizes['2048x2048-width'] || 1080)
const heroHeight = computed(() => heroImage.value?.sizes['2048x2048-height'] || 1618)
const isLoading = ref(true)
const loadingIconWidth = "2.5rem"
const loadingIconHeight = "2.5rem"

async function fetchGalleryPage() {
  isLoading.value = true
  try {
	const response = await fetchFromWp('hero', {
			query: { slug: 'moments-captured-stories-untold', _embed: true }
		})
		const hero = ((response as unknown) as any[])[0]
		heroContent.value = hero
		heroImage.value = hero.acf.image
		console.log('hero image', heroImage.value)
  } catch (error: any) {
    console.error("Fetch Error:", error.data || error.message)
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
	fetchGalleryPage()
})

const header = computed(() => heroContent?.value?.acf.title ?? "Default Header")
const teaser = computed(() => heroContent?.value?.acf.teaser ?? "Default teaser text goes here.")


</script>

<template>
	<div class="relative flex h-[calc(100vh-70px)] flex-col">
		<div v-if="isLoading" class="absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-white">
			<Loading :width="loadingIconWidth" :height="loadingIconHeight" />
		</div>
		<div class="z-30 flex h-48 flex-1 flex-col justify-end p-6 md:max-h-64">
			<h1 class="mb-4 text-4xl font-medium tracking-tighter">{{ header }}</h1>
			<p class="text-sm">{{ teaser }}</p>
		</div>
		<div class="relative z-10 w-full flex-1 overflow-hidden">
			<NuxtImg
				v-if="heroImage"
				:src="heroImage.url"
				:srcset="heroSrcSet"
				:sizes="heroSizes"
				class="absolute inset-0 object-cover w-full h-full"
				:width="heroWidth"
				:height="heroHeight"
				:alt="heroImage.alt || ''"
			/>
			<!--<div :style="heroBackgroundStyle" class="h-full w-full bg-cover bg-center"></div>-->
			<div class="absolute inset-0 z-20 bg-black/20"></div>
		</div>
	</div>
</template>

<style></style>
