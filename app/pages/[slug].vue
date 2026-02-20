<!--pages/[slug].vue-->
<script setup lang="ts">
const route = useRoute()
const { fetchFromWp } = useWpApi()
const nuxtApp = useNuxtApp()

const loadingIconWidth = "2.5rem"
const loadingIconHeight = "2.5rem"
const imageSizes = "100vw"

interface WpPage {
	title: { rendered: string }
	excerpt: { rendered: string }
	acf: {
		teaser: string
		[key: string]: any
	}
}
interface WpImage {
	url: string
	alt: string
	title: string
	caption: string
	description: string
}

const pageStore = useState<Record<string, WpPage | null>>("pages-store", () => ({}))
console.log("Page store initial state:", pageStore.value)

const slug = route.params.slug as string
console.log("Current route slug:", slug)

const { data: page, pending } = await useAsyncData<WpPage>(
	`page-${slug}`, // Unique key per slug
	async () => {
		if (pageStore.value[slug]) {
			return pageStore.value[slug]
		}

		const res = await fetchFromWp<WpPage[]>("pages", { query: { slug } })
		const result = res[0]

		if (!result) {
			throw createError({ statusCode: 404, statusMessage: "Page Not Found" })
		}

		pageStore.value[slug] = result
		return result
	},
	{
		getCachedData: (key) => {
			return nuxtApp.payload.data[key] || pageStore.value[slug]
		}
	}
)

watch(page, (newPage) => {
	if (!newPage) return
	console.log("Page refreshed:", newPage.title.rendered)
})
console.log("Page reactive data:", page.value)

const galleryImages = computed(() => {
	const acf = page.value?.acf
	if (!acf) return []

	return Object.keys(acf)
		.filter((key) => key.startsWith("image"))
		.sort((a, b) => {
			return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
		})
		.map((key) => acf[key])
		.filter((img) => img && typeof img === "object" && img.url)
})

const content = computed(() => page.value?.acf?.content ?? "")

useSeoMeta({
	title: () => page.value?.title?.rendered || "Loading...",
	description: () => page.value?.excerpt?.rendered?.replace(/<[^>]*>/g, "") || ""
})
</script>
<template>
	<div class="container mx-auto px-6 py-24">
		<div v-if="pending" class="absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-white">
			<Loading :height="loadingIconHeight" :width="loadingIconWidth" />
		</div>

		<article v-else class="mx-auto flex max-w-4xl flex-col">
			<BackButton><ArrowLeftIcon /><span class="font-semibold">Back</span></BackButton>
			<div class="flex flex-col md:flex-row md:items-center">
				<div>
					<h1 class="my-8 text-5xl tracking-tighter" v-html="page?.title.rendered"></h1>
					<p class="text-lg leading-6">{{ page?.acf.excerpt }}</p>
				</div>
				<div class="md:h-screen md:overflow-scroll">
					<div v-html="content" class="prose"></div>
				</div>
			</div>
			<div class="wrapper-grid">
				<figure v-for="(img, index) in galleryImages" :key="index" class="relative aspect-[4/3] overflow-hidden">
					<picture>
						<NuxtImg v-if="img" :src="img.url" :sizes="imageSizes" class="h-full w-full object-cover" :width="img.width || 1080" :height="img.height || 1618" :alt="img.alt || ''" />
					</picture>
					<div class="absolute inset-0 z-20 bg-black/40"></div>
					<figcaption class="absolute bottom-0 left-0 right-0 z-30 block bg-gradient-to-t from-black/40 p-4 pt-24 text-xs text-white lg:p-8 lg:text-xl">
						<span class="font-semibold">{{ img.alt }}</span
						><br /><span class="opacity-70">{{ truncateText(img.caption, 72) }}</span>
					</figcaption>
				</figure>
			</div>
		</article>
	</div>
</template>
