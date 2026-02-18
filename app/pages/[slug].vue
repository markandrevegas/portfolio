<!--pages/[slug].vue-->
<script setup lang="ts">
	const route = useRoute()
	const { fetchFromWp } = useWpApi()

	const slug = route.params.slug as string

	interface WpPage {
		title: { rendered: string }
		content: { rendered: string }
		excerpt: { rendered: string }
	}
	const { data: page, pending, error } = await useAsyncData(`page-${slug}`, async () => {
    const response = await fetchFromWp<WpPage[]>('pages', { 
			query: { 
				slug: slug,
				_embed: true 
			} 
    })
		
		// Now TypeScript knows 'response' is an array of WpPage
		return response?.[0] || null
	})
	useSeoMeta({
		title: () => page.value?.title?.rendered || 'Loading...',
		description: () => page.value?.excerpt?.rendered?.replace(/<[^>]*>/g, '') || ''
	})
</script>
<template>
	<div class="container mx-auto px-6 py-24">
    <div v-if="pending" class="animate-pulse">
      <div class="h-12 bg-gray-200 w-1/2 mb-8"></div>
      <div class="h-4 bg-gray-200 w-full mb-4"></div>
      <div class="h-4 bg-gray-200 w-3/4"></div>
    </div>

    <div v-else-if="error || !page" class="text-center py-20">
      <h1 class="text-4xl font-bold">404 - Page Not Found</h1>
      <NuxtLink to="/" class="mt-4 inline-block text-blue-500 underline">Go Home</NuxtLink>
    </div>

    <article v-else class="max-w-4xl mx-auto">
      <h1 class="text-5xl font-bold mb-8" v-html="page.title.rendered"></h1>
      <div class="prose prose-lg max-w-none" v-html="page.content.rendered"></div>
    </article>
  </div>
</template>