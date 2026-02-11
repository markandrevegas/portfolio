<script setup>
import { inject } from "vue"

const photo = inject("photo")
const header = inject("header")
const loading = inject("loading")

const loadingIconWidth = "2.5rem"
const loadingIconHeight = "2.5rem"
</script>

<template>
	<div class="h-[calc(100vh-70px)] relative flex flex-col">
		<div v-if="loading" class="absolute top-0 right-0 bottom-0 left-0 z-50 flex flex-col justify-center items-center bg-white">
			<Loading :width="loadingIconWidth" :height="loadingIconHeight" />
		</div>
		<div class="flex-1 flex flex-col h-48 md:max-h-64 justify-end z-30 p-6">
			<h1 class="text-4xl font-medium tracking-tighter">{{ header }}</h1>
		</div>
		<div class="flex-1 relative w-full z-10 overflow-hidden">
			<NuxtImg v-if="photo" :src="photo.urls.full" :alt="photo.alt" class="object-cover lg:object-none w-full h-full" />
			<div class="absolute inset-0 z-20 bg-black/20"></div>
		</div>
	</div>
</template>

<style></style>
