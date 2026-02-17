<script setup lang="ts">
	import { computed, onMounted } from 'vue'
	import { useWpApi } from "../../composables/useWpApi"

	const { fetchFromWp } = useWpApi()

	const imageSizes = '100vw'

	const { data: aboutContent, pending } = await useAsyncData('about-content', async () => {
    const response = await fetchFromWp('bio', { query: { slug: 'about', _embed: true } })
    return (response as any[])[0] || null
})

	const aboutImage = computed(() => aboutContent?.value?.acf?.image ?? null)
	const header = computed(() => aboutContent?.value?.acf?.title ?? "Default Header")
	const teaser = computed(() => aboutContent?.value?.acf?.description ?? "Default teaser text goes here.")

	onMounted(async () => {
		console.log(aboutContent.value)
	})

</script>
<template>
	<div class="wrapper">
		<div v-if="pending" class="absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-white">
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
					:width="aboutImage.width"
					:height="aboutImage.height"
					:alt="aboutImage.alt || ''"
				/>
				<div class="absolute inset-0 z-20 bg-black/20"></div>
			</div>
			<div class="lg:place-self-end"><p>{{teaser}}</p></div>
		</div>
	</div>
</template>
