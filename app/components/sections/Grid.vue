<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
	data: any
	hasError: boolean
}>()

const imgSize = "100vw"
const loadingIconWidth = "2.5rem"
const loadingIconHeight = "2.5rem"
const title = computed(() => props.data?.acf?.title ?? "Latest Features")
const description = computed(() => props.data?.acf?.description ?? "")

interface ImageItem {
  src: string
  alt?: string
  caption?: string
}

const images = computed(() => {
	const results: { src: string; caption: string; alt: string }[] = []
	if (props.data?.acf) {
		const acf = props.data.acf
		Object.keys(acf)
			.filter((key) => key.startsWith("image"))
			.forEach((key) => {
				if (acf[key] && typeof acf[key] === "object") {
					results.push({
						src: acf[key].url,
						alt: acf[key].alt || acf[key].title || "",
						caption: acf[key].caption || acf[key].title || ""
					})
				}
			})
	}
	return results
})

const isModalOpen = ref(false)
const selectedImage = ref<ImageItem | null>(null)

function openModal(img: ImageItem) {
	console.log('clicked')
  selectedImage.value = img
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  selectedImage.value = null
}
</script>
<template>
	<div class="flex flex-1 flex-col">
		<!--<div v-if="isLoading" class="absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-white">
			<Loading :width="loadingIconWidth" :height="loadingIconHeight" />
		</div>-->
		<div v-if="hasError" class="absolute inset-0 z-40 flex items-center justify-center bg-red-50/50 p-6 text-center text-red-600">
			<p>Failed to load content. Please check back later.</p>
		</div>
		<div class="wrapper">
			<div class="wrapper-grid">
				<div>
					<h2 class="mb-8 font-bold">{{ title }}</h2>
				</div>
				<div>
					<p class="max-w-96">{{ description }}</p>
				</div>
			</div>
			<div class="wrapper-grid">
				<figure @click="openModal(img)" v-for="(img, index) in images" :key="index" class="relative aspect-[4/3] overflow-hidden">
					<picture>
						<NuxtImg :src="img.src" :alt="img.alt" class="absolute inset-0 h-full w-full object-cover" />
						<NuxtImg v-if="img" :src="img.src" :sizes="imgSize" class="h-full w-full object-cover" :alt="img.alt || ''" />
					</picture>
					<div class="absolute inset-0 z-20 bg-black/40"></div>
					<figcaption class="absolute bottom-0 left-0 right-0 z-30 block bg-gradient-to-t from-black/40 p-4 pt-24 text-xs text-white">
						<span class="font-semibold">{{ img.alt }}</span
						><br /><span class="opacity-70">{{ truncateText(img.caption, 48) }}</span>
					</figcaption>
				</figure>
			</div>
		</div>
		<Teleport to="body">
			<div v-if="isModalOpen && selectedImage" class="fixed inset-0 z-50 bg-palladian min-h-screen">
				<div class="w-full max-w-6xl mx-auto grid grid-col-1 md:grid-cols-2 p-8">
					<div>
						<button class="text-abyssal text-sm flex justify-start items-center" @click="closeModal">
							<ArrowLeftIcon />
							<span class="slide-link">
								<span class="slide-wrap font-semibold">
									<span class="slide-text">Back</span>
									<span class="slide-text slide-text--clone">Back</span>
								</span>
							</span>
						</button>
						<div class="mt-4 text-abyssal text-sm">
							<h2 class="font-medium tracking-tighter text-3xl mb-8">{{ selectedImage.alt }}</h2>
							<p class="opacity-70 md:max-w-96">{{ selectedImage.caption }}</p>
							<div class="mt-8">
								<p><span class="font-semibold">Client: </span>Personal project</p>
								<p><span class="font-semibold">Project: </span>Blazers</p>
								<p><span class="font-semibold">Year: </span> 2024</p>
							</div>
						</div>
					</div>
					<NuxtImg :src="selectedImage.src" :alt="selectedImage.alt || ''" class="w-full h-auto object-contain" />
				</div>
			</div>
		</Teleport>
	</div>
</template>
