<script setup lang="ts">
	import { computed } from 'vue'

	const props = defineProps<{
		data: any
		isLoading: boolean
		hasError: boolean
	}>()

	const imageSizes = '100vw'
	const loadingIconWidth = "2.5rem"
	const loadingIconHeight = "2.5rem"

	const header = computed(() => props.data?.acf?.title ?? "Default Header")
	const teaser = computed(() => props.data?.acf?.description ?? "Default teaser text.")
	const aboutImage = computed(() => props.data?.acf?.image ?? null)

</script>
<template>
	<div class="wrapper">
		<div v-if="isLoading" class="absolute top-0 right-0 bottom-0 left-0 z-50 flex flex-col items-center justify-center bg-white">
			<Loading :width="loadingIconWidth" :height="loadingIconHeight" />
		</div>
		<div v-else-if="data" class="wrapper-grid">
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
