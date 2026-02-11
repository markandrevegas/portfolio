<script setup>
import { inject } from "vue"

const photo = inject("photo")
const header = inject("header")
const text = inject("text")
const loading = inject("loading")

const loadingIconWidth = "2.5rem"
const loadingIconHeight = "2.5rem"
</script>

<template>
	<div class="h-[calc(100vh-70px)] relative">
		<div v-if="loading" class="absolute top-0 right-0 bottom-0 left-0 z-50 flex flex-col justify-center items-center bg-white">
			<Loading :width="loadingIconWidth" :height="loadingIconHeight" />
		</div>
		<div class="absolute bottom-0 w-full h-3/5 z-10 overflow-hidden">
			<NuxtImg v-if="photo" :src="photo.urls.full" :alt="photo.alt" class="object-cover" />
			<div class="absolute inset-0 z-20 bg-black/20"></div>
		</div>
		<div class="h-72 text-right absolute right-0 bottom-0 left-0 z-30 p-6 text-white flex-flex-col justify-start">
			<h1 class="text-3xl uppercase font-medium">{{ header }}</h1>
			<p class="mt-2 max-w-md uppercase">{{ text }}</p>
		</div>
	</div>
</template>

<style></style>
