<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue'
	import { useWpApi } from "../../composables/useWpApi"

	const { fetchFromWp } = useWpApi()

	const aboutContent = ref<any>(null)
	const aboutImage = ref<any>(null)
	const imageSizes = '100vw'

	const isLoading = ref(true)

	const loadingIconWidth = "2.5rem"
	const loadingIconHeight = "2.5rem"

	async function fetchAboutContent() {
		isLoading.value = true
		try {
		const response = await fetchFromWp('bio', {
				query: { slug: 'about', _embed: true }
			})
			const aboutData = ((response as unknown) as any[])[0]
			aboutContent.value = aboutData
			console.log('aboutContent', aboutContent.value)
			aboutImage.value = aboutData.acf.image
			console.log('about image', aboutImage.value)
		} catch (error: any) {
			console.error("Fetch Error:", error.data || error.message)
		} finally {
			isLoading.value = false
		}
	}

	onMounted(() => {
		fetchAboutContent()
	})

	const header = computed(() => aboutContent?.value?.acf?.title ?? "Default Header")
	const teaser = computed(() => aboutContent?.value?.acf?.description ?? "Default teaser text goes here.")

</script>
<template>
	<div class="wrapper">
		<div v-if="isLoading" class="absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-white">
			<Loading :width="loadingIconWidth" :height="loadingIconHeight" />
		</div>
		<div class="wrapper-grid">
			<div>
				<h2 class="mb-8 font-medium">{{header}}</h2>
			</div>
			<div class="relative z-10 w-full flex-1 overflow-hidden h-64">
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
