<script setup lang="ts">
	import { computed } from 'vue'

	const props = defineProps<{
		data: any
		isLoading: boolean
		hasError: boolean
	}>()

	// const heroSizes = '100vw'
	const loadingIconWidth = "2.5rem"
	const loadingIconHeight = "2.5rem"
	const title = computed(() => props.data?.acf?.title ?? "Latest Features")
	const description = computed(() => props.data?.acf?.description ?? "")

	const images = computed(() => {
    const results: { src: string; caption: string; alt: string }[] = []
    if (props.data?.acf) {
			const acf = props.data.acf
			Object.keys(acf)
			.filter(key => key.startsWith('image'))
			.forEach(key => {
				if (acf[key] && typeof acf[key] === 'object') {
					results.push({
						src: acf[key].url,
						alt: acf[key].alt || acf[key].title || '',
						caption: acf[key].caption || acf[key].title || ''
					})
				}
			})
    }
    return results
	})

</script>
<template>
	<div class="flex flex-1 flex-col">
		<div v-if="isLoading" class="absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-white">
			<Loading :width="loadingIconWidth" :height="loadingIconHeight" />
		</div>
		<div v-if="hasError && !isLoading" class="absolute inset-0 z-40 flex items-center justify-center bg-red-50/50 text-red-600 p-6 text-center">
			<p>Failed to load content. Please check back later.</p>
    </div>
		<div class="wrapper">
			<div class="wrapper-grid">
				<div>
					<h2 class="mb-8 font-bold">{{title}}</h2>
				</div>
				<div>
					<p>{{description}}</p>
				</div>
			</div>
			<div class="wrapper-grid">
				<figure v-for="(img, index) in images" :key="index" class="relative aspect-[4/3] overflow-hidden">
					<picture>
						<NuxtImg :src="img.src" :alt="img.alt" class="absolute inset-0 h-full w-full object-cover" />
					</picture>
					<div class="absolute inset-0 z-20 bg-black/40"></div>
					<figcaption class="absolute bottom-0 left-0 right-0 z-30 block bg-gradient-to-t from-black/40 p-4 pt-24 text-xs text-white lg:p-8 lg:text-xl">
						<span class="font-semibold">{{ img.alt }}</span
						><br /><span class="opacity-70">{{ truncateText(img.caption, 72) }}</span>
					</figcaption>
				</figure>
			</div>
		</div>
	</div>
</template>
