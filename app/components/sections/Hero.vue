<script setup lang="ts">
import { inject, computed, type Ref } from "vue"

const photo = inject("photo") as Ref<any> | undefined
const loading = inject("loading") as Ref<boolean> | undefined
const contentData = inject("contentData") as Ref<{
	title?: string
	teaser?: string
	heroImage?: string
} | null> | undefined

const header = computed(() => contentData?.value?.title ?? "Default Header")
const teaser = computed(() => contentData?.value?.teaser ?? "Default teaser text goes here.")
const heroImage = computed(() => contentData?.value?.heroImage ?? photo?.value?.urls?.full ?? null)

// Keep an always-present element and apply background-image via style
const heroBackgroundStyle = computed(() => {
	const url = heroImage.value
	return url ? { backgroundImage: `url('${url}')` } : {}
})

const loadingIconWidth = "2.5rem"
const loadingIconHeight = "2.5rem"
</script>

<template>
	<div class="h-[calc(100vh-70px)] relative flex flex-col">
		<div v-if="loading" class="absolute top-0 right-0 bottom-0 left-0 z-50 flex flex-col justify-center items-center bg-white">
			<Loading :width="loadingIconWidth" :height="loadingIconHeight" />
		</div>
		<div class="flex-1 flex flex-col h-48 md:max-h-64 justify-end z-30 p-6">
			<h1 class="text-4xl font-medium tracking-tighter mb-4">{{ header }}</h1>
			<p class="text-sm">{{ teaser }}</p>
		</div>
		<div class="flex-1 relative w-full z-10 overflow-hidden">
			<div :style="heroBackgroundStyle" class="w-full h-full bg-center bg-cover"></div>
			<div class="absolute inset-0 z-20 bg-black/20"></div>
		</div>
	</div>
</template>

<style></style>
