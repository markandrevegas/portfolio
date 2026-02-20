<!--pages/[slug].vue-->
<script setup lang="ts">
	const route = useRoute()
	const { fetchFromWp } = useWpApi()

	const loadingIconWidth = "2.5rem"
	const loadingIconHeight = "2.5rem"
	const imageSizes = '100vw'

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

	const pageStore = useState<Record<string, WpPage | null>>(
		'pages-store',
		() => ({})
	)
	console.log('Page store initial state:', pageStore.value)

	const slug = route.params.slug as string
		console.log('Current route slug:', slug)
		
		const { data: page, pending, error } = await useAsyncData<WpPage | null>(
		'slug-' + slug,
		async () => {
			console.log('Fetching page for slug:', slug)

			if (pageStore.value[slug]) {
				console.log('Found page in store:', pageStore.value[slug])
				return pageStore.value[slug]
			}

			try {
				const res = await fetchFromWp<WpPage[]>('pages', {
					query: { slug }
				})
				const result = res[0] ?? null
				console.log('Fetched page from WP:', result)
				pageStore.value[slug] = result
				return result
			} catch (err) {
				console.error('Error fetching page:', err)
				return null
			}
		}
	)

	console.log('Page reactive data:', page.value)

	const galleryImages = computed(() => {
		if (!page.value?.acf) return []
		
		const acf = page.value.acf
		return Object.keys(acf)
		.filter(key => key.startsWith('image'))
		.sort((a, b) => {
				return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
		})
		.map(key => acf[key])
		.filter(img => img && typeof img === 'object' && img.url)
	})

	const content = computed(() => {
		if (!page.value?.acf) return ''
		console.log('Page content:', page.value.acf.content)
		return page.value.acf.content ?? ''
	})
	useSeoMeta({
		title: () => page.value?.title?.rendered || 'Loading...',
		description: () => page.value?.excerpt?.rendered?.replace(/<[^>]*>/g, '') || ''
	})
</script>
<template>
	<div class="container mx-auto px-6 py-24">
    <div v-if="pending" class="absolute top-0 right-0 bottom-0 left-0 z-50 flex flex-col items-center justify-center bg-white">
      <Loading :height="loadingIconHeight" :width="loadingIconWidth" />
    </div>

    <div v-else-if="error || !page" class="text-center py-20">
      <h1 class="text-4xl font-bold">404 - Page Not Found</h1>
      <NuxtLink to="/" class="mt-4 inline-block text-blue-500 underline">Go Home</NuxtLink>
    </div>

    <article v-else class="max-w-4xl mx-auto flex flex-col">
			<BackButton><ArrowLeftIcon /><span class="font-semibold">Back</span></BackButton>
      <h1 class="text-4xl tracking-tighter my-4" v-html="page.title.rendered"></h1>
      <p>{{ page.acf.excerpt }}</p>
			<p>{{ content }}</p>
			<div class="wrapper-grid">
				<figure v-for="(img, index) in galleryImages" :key="index" class="relative aspect-[4/3] overflow-hidden">
					<picture>
						<NuxtImg
							v-if="img"
							:src="img.url"
							:sizes="imageSizes"
							class="w-full h-full object-cover"
							:width="img.width || 1080"
							:height="img.height || 1618"
							:alt="img.alt || ''"
						/>
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