<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
	data: any
	isLoading: boolean
	hasError: boolean
}>()

const imageSizes = "100vw"
const loadingIconWidth = "2.5rem"
const loadingIconHeight = "2.5rem"

const header = computed(() => props.data?.acf?.title ?? "Default Header")
const teaser = computed(() => props.data?.acf?.description ?? "Default teaser text.")
const aboutImage = computed(() => props.data?.acf?.image ?? null)
</script>
<template>
	<div class="wrapper">
		<div v-if="isLoading" class="absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-white">
			<Loading :width="loadingIconWidth" :height="loadingIconHeight" />
		</div>
		<div v-else-if="data" class="wrapper-grid">
			<div>
				<h2 class="mb-8 font-bold">{{ header }}</h2>
				<div class="relative z-10 aspect-[16/9] w-full flex-1 overflow-hidden">
					<NuxtImg v-if="aboutImage" :src="aboutImage.url" :sizes="imageSizes" class="h-full w-full object-cover" :width="aboutImage.width || 1080" :height="aboutImage.height || 1618" :alt="aboutImage.alt || ''" />
					<div class="absolute inset-0 z-20 bg-black/20"></div>
				</div>
			</div>
			<div class="relative z-10 w-full flex-1 sm:pt-16">
				<p>{{ teaser }}</p>
			</div>
		</div>
	</div>
</template>
