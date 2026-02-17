<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useWpApi } from "../../composables/useWpApi"

const { fetchFromWp } = useWpApi()

// Use refs instead of useAsyncData to match Hero.vue
const aboutContent = ref<any>(null)
const aboutImage = ref<any>(null)
const isLoading = ref(true)

const imageSizes = '100vw'

async function fetchAboutContent() {
  isLoading.value = true
  try {
    const response = await fetchFromWp('bio', {
      // Note: verify if slug is 'about' or 'bio' in your WP admin
      query: { slug: 'bio', _embed: true }
    })
    const bio = (response as any[])[0]
    if (bio) {
      aboutContent.value = bio
      aboutImage.value = bio.acf?.image || null
    }
  } catch (error: any) {
    console.error("Fetch Error:", error.data || error.message)
  } finally {
    isLoading.value = false
  }
}

// Data fetching happens ONLY on the client
onMounted(() => {
  fetchAboutContent()
})

const header = computed(() => aboutContent.value?.acf?.title ?? "Default Header")
const teaser = computed(() => aboutContent.value?.acf?.description ?? "Default teaser text goes here.")
</script>
<template>
	<div class="wrapper">
		<div v-if="isLoading" class="absolute top-0 right-0 bottom-0 left-0 z-50 flex flex-col items-center justify-center bg-white">
			<Loading />
		</div>
		<div v-else-if="aboutContent" class="wrapper-grid">
			<div>
				<h2 class="mb-8 font-medium">{{header}}</h2>
			</div>
			<div class="relative z-10 w-full flex-1 overflow-hidden aspect-[16/9]">
				<NuxtImg
					v-if="aboutImage"
					:src="aboutImage.url"
					:sizes="imageSizes"
					class="w-full h-full object-cover"
					:width="aboutImage.width || 1080"
					:height="aboutImage.height || 1618"
					:alt="aboutImage.alt || ''"
				/>
				<div class="absolute inset-0 z-20 bg-black/20"></div>
			</div>
			<div class="lg:place-self-end"><p>{{teaser}}</p></div>
		</div>
	</div>
</template>
