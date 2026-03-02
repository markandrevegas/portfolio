<script setup lang="ts">
import { computed } from "vue"
import { generateSrcset, type WpImageSizes } from '~/utils/image'


interface Props {
	data: any
	hasError: boolean
}

const props = defineProps<Props>()
const responsiveSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1536px'

const header = computed(() => props.data?.acf?.title ?? "Default Header")
const teaser = computed(() => props.data?.acf?.teaser ?? "Default teaser text.")
const heroImage = computed(() => props.data?.acf?.image ?? null)

const imageSrcset = computed(() => {
  if (!heroImage.value?.sizes) return undefined
  return generateSrcset(heroImage.value.sizes)
})
const mainSrc = computed(() => {
  if (heroImage.value.sizes) {
    return heroImage.value.sizes['2048x2048'] || heroImage.value.sizes['1536x1536']
  }
  return heroImage.value.url
})
console.log(heroImage.value)
</script>

<template>
	<div class="relative flex h-[calc(100vh-70px)] flex-col lg:h-[60vh] lg:flex-row lg:items-center">
		<!--<div v-if="isLoading" class="absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-white">
			<Loading :width="loadingIconWidth" :height="loadingIconHeight" />
		</div>-->
		<div v-if="hasError" class="absolute inset-0 z-40 flex items-center justify-center bg-red-50/50 p-6 text-center text-red-600">
			<p>Failed to load content. Please check back later.</p>
		</div>
		<div class="z-30 flex h-48 flex-1 flex-col justify-end p-6 md:max-h-64">
			<h1 class="mb-4 text-4xl font-bold tracking-tighter">{{ header }}</h1>
			<p class="text-sm max-w-96">{{ teaser }}</p>
		</div>
		<div class="relative z-10 w-full flex-1 overflow-hidden lg:h-full">
			<img v-if="heroImage" :src="mainSrc" :srcset="imageSrcset" :sizes="responsiveSizes"
				class="md:object-fit md:aspect-4/3 absolute inset-0 h-full w-full object-cover object-center md:object-top"
				:width="heroImage.sizes?.['2048x2048-width'] || heroImage.width || 1080"
				:height="heroImage.sizes?.['2048x2048-height'] || heroImage.height || 1618"
				:alt="heroImage.alt || ''"
				loading="eager"
			/>
			<div class="absolute inset-0 z-20 bg-black/30"></div>
		</div>
	</div>
</template>

<style></style>
