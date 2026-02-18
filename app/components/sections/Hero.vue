<script setup lang="ts">
	import { computed } from 'vue'

	const props = defineProps<{
		data: any
		isLoading: boolean
		hasError: boolean
	}>()

	const heroSizes = '100vw'
	const loadingIconWidth = "2.5rem"
	const loadingIconHeight = "2.5rem"

	const header = computed(() => props.data?.acf?.title ?? "Default Header")
	const teaser = computed(() => props.data?.acf?.teaser ?? "Default teaser text.")
	const heroImage = computed(() => props.data?.acf?.image ?? null)
</script>

<template>
	<div class="relative flex h-[calc(100vh-70px)] lg:h-[60vh] flex-col lg:flex-row lg:items-center">
		<div v-if="isLoading" class="absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-white">
			<Loading :width="loadingIconWidth" :height="loadingIconHeight" />
		</div>
		<div v-if="hasError && !isLoading" class="absolute inset-0 z-40 flex items-center justify-center bg-red-50/50 text-red-600 p-6 text-center">
			<p>Failed to load content. Please check back later.</p>
    </div>
		<div class="z-30 flex h-48 flex-1 flex-col justify-end p-6 md:max-h-64">
			<h1 class="mb-4 text-4xl font-bold tracking-tighter">{{ header }}</h1>
			<p class="text-sm">{{ teaser }}</p>
		</div>
		<div class="relative z-10 w-full lg:h-full flex-1 overflow-hidden">
			<NuxtImg
				v-if="heroImage"
				:src="heroImage.url"
				:sizes="heroSizes"
				class="absolute inset-0 object-cover w-full h-full"
				:width="heroImage.width || 1080"
				:height="heroImage.height || 1618"
				:alt="heroImage.alt || ''"
				loading="eager"
			/>
			<div class="absolute inset-0 z-20 bg-black/20"></div>
		</div>
	</div>
</template>

<style></style>
