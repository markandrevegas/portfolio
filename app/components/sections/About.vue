<script setup lang="ts">
import { inject, ref } from "vue"

interface UnsplashPhoto {
	urls: {
		full: string
		regular: string
	}
	alt: string
	width: number
	height: number
}

const photo = inject<UnsplashPhoto | null>("photo")
const imgWidth = ref(800)
const imgHeight = ref(600)
</script>
<template>
	<div class="wrapper">
		<div class="wrapper-grid">
			<div>
				<h2 class="mb-8 font-medium">About the tailor</h2>
			</div>
			<div class="relative">
				<NuxtImg v-if="photo" :src="photo.urls.full" :alt="photo.alt" :width="imgWidth" :height="imgHeight" class="h-full w-full object-cover lg:object-none" />
				<div class="absolute inset-0 z-20 bg-black/20"></div>
			</div>
			<div class="lg:place-self-end"><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim totam neque eaque rem harum ducimus provident repellat nisi nesciunt magnam aliquam odio explicabo molestiae exercitationem, velit temporibus officiis, ad distinctio.</p></div>
		</div>
	</div>
</template>
