<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug as string)

interface WpPage {
  title: { rendered: string }
  excerpt: { rendered: string }
  slug: string
  acf: {
    teaser: string
    [key: string]: any
  }
}

const { data: page } = await useAsyncData(
  () => `page-${slug.value}`,
  async () => {
    let pages: WpPage[]
    if (import.meta.server) {
      const { readFileSync } = await import('fs')
      const { join } = await import('path')
      const pagesPath = join(process.cwd(), 'public/data/pages.json')
      pages = JSON.parse(readFileSync(pagesPath, 'utf-8'))
    } else {
      pages = await $fetch('/data/pages.json')
    }

    const result = pages.find(p => p.slug === slug.value)
    if (!result) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
        fatal: true
      })
    }

    return result
  },
  {
    watch: [slug]
  }
)

const imageSizes = "100vw"
const galleryImages = computed(() => {
  const acf = page.value?.acf
  if (!acf) return []

  // Get all image fields and sort them
  return Object.keys(acf)
    .filter((key) => key.startsWith("image"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((key) => {
      const img = acf[key]
      if (!img || typeof img !== "object" || !img.url) return null

      return {
        ...img,
        mainSrc: img.sizes
          ? img.sizes['2048x2048'] || img.sizes['1536x1536'] || img.url
          : img.url,
        srcset: img.sizes ? generateSrcset(img.sizes) : undefined
      }
    })
    .filter(Boolean) // remove nulls
})
// console.log(galleryImages.value)

const content = computed(() => page.value?.acf?.content ?? "")

useSeoMeta({
  title: () => page.value?.title?.rendered + ' | Portfolio' || "Portfolio",
  description: () => {
    const rawDesc = page.value?.acf?.metadescription || ""
    const cleanDesc = rawDesc.replace(/<[^>]*>/g, "").trim()
    return cleanDesc || "Explore 3 years of bespoke tailoring and custom alterations."
  }
})
</script>
<template>
	<div class="px-4">
		<div v-if="page" class="flex flex-col pb-16">
			<BackButton>
				<ArrowLeftIcon />
				<span class="slide-link">
					<span class="slide-wrap font-semibold">
						<span class="slide-text">Back</span>
						<span class="slide-text slide-text--clone">Back</span>
					</span>
				</span>
			</BackButton>
			<article class="flex flex-col md:flex-row md:items-start w-full">
				<div class="min-w-96">
					<h1 class="my-8 text-5xl tracking-tighter" v-html="page?.title.rendered"></h1>
					<p class="leading-6 max-w-96">{{ page?.acf.excerpt }}</p>
				</div>
				<div class="md:px-16 md:pb-32 flex flex-col flex-1 gap-8">
					<div class="max-w-prose md:h-96 md:overflow-scroll no-scrollbar">
						<div v-html="content" class="prose"></div>
						<div v-html="content" class="prose"></div>
					</div>
					<div v-if="galleryImages.length" class="wrapper-grid max-w-6xl">
						<figure
							v-for="img in galleryImages"
							:key="img.url"
							class="relative aspect-[4/3] overflow-hidden"
						>
							<picture>
								<NuxtImg
									v-if="img"
									:src="img.mainSrc"
									:srcset="img.srcset"
									:sizes="imageSizes"
									class="h-full w-full object-cover"
									:width="img.width || 1080"
									:height="img.height || 1618"
									:alt="img.alt || ''"
								/>
							</picture>
							<div class="absolute inset-0 z-20 bg-black/40"></div>
							<figcaption
								class="absolute bottom-0 left-0 right-0 z-30 block bg-gradient-to-t from-black/40 p-4 pt-24 text-xs text-white lg:p-8 lg:text-sm"
							>
								<span class="font-semibold">{{ img.alt }}</span
								><br /><span class="opacity-70">{{ truncateText(img.caption, 72) }}</span>
							</figcaption>
						</figure>
					</div>
				</div>
			</article>
		</div>
		<div v-else class="flex flex-col pb-16">
			<BackButton>
				<ArrowLeftIcon />
				<span class="slide-link">
					<span class="slide-wrap font-semibold">
						<span class="slide-text">Back</span>
						<span class="slide-text slide-text--clone">Back</span>
					</span>
				</span>
			</BackButton>
			<!--<div class="error-container">
				<article class="md:w-1/2">
					<h1 class="my-8 text-5xl tracking-tighter">{{ error?.statusMessage }}</h1>
					<p class="leading-6 max-w-96">Like a photo that was never developed, this page might have faded into the dark. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur odio, excepturi a at sint maxime eveniet assumenda delectus adipisci dolore quae explicabo quidem expedita voluptates aperiam incidunt ipsam consequatur nobis?</p>
				</article>
				<div></div>
			</div>-->
		</div>
	</div>
</template>
