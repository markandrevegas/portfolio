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
// console.log(heroImage.value)
</script>

<template>
	<div class="relative flex h-[calc(100vh-70px)] flex-col">
		<div v-if="hasError" class="absolute inset-0 z-40 flex items-center justify-center bg-red-50/50 p-6 text-center text-red-600">
			<p>Failed to load content. Please check back later.</p>
		</div>
		<div class="z-30 flex h-96 sm:h-[50vh] lg:h-[35vh] flex-col justify-end p-6">
			<h1 class="mb-4 text-5xl md:text-6xl tracking-tighter">{{ header }}</h1>
		</div>
		<div class="relative z-10 w-full flex-1">
			<NuxtImg v-if="heroImage" :src="heroImage.url" :sizes="responsiveSizes" class="h-full w-full object-cover" :width="heroImage.width || 1080" :height="heroImage.height || 1618" :alt="heroImage.alt || ''" />
			<div class="absolute inset-0 z-20 bg-black/30"></div>
		</div>
	</div>
</template>

<style></style>
