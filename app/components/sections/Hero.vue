<script setup lang="ts">
import { inject, computed, type Ref } from "vue"

const photo = inject("photo") as Ref<any> | undefined
const loading = inject("loading") as Ref<boolean> | undefined
const contentData = inject("contentData") as
	| Ref<{
			title?: string
			teaser?: string
			heroImage?: string
	  } | null>
	| undefined

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
	<div class="relative flex h-[calc(100vh-70px)] flex-col">
		<div v-if="loading" class="absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-white">
			<Loading :width="loadingIconWidth" :height="loadingIconHeight" />
		</div>
		<div class="z-30 flex h-48 flex-1 flex-col justify-end p-6 md:max-h-64">
			<h1 class="mb-4 text-4xl font-medium tracking-tighter">{{ header }}</h1>
			<p class="text-sm">{{ teaser }}</p>
		</div>
		<div class="relative z-10 w-full flex-1 overflow-hidden">
			<div :style="heroBackgroundStyle" class="h-full w-full bg-cover bg-center"></div>
			<div class="absolute inset-0 z-20 bg-black/20"></div>
		</div>
	</div>
</template>

<style></style>
