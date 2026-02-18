<script setup lang="ts">
	const { fetchFromWp } = useWpApi()

	// Single source of truth for the Home Page
	const { data: homeData, error } = await useAsyncData('home-v4', async () => {
		const [hero, bio, feature, contact] = await Promise.all([
			fetchFromWp('hero', { query: { slug: 'moments-captured-stories-untold', _embed: true } }),
			fetchFromWp('bio', { query: { slug: 'bio', _embed: true } }),
			fetchFromWp('contact', { query: { slug: 'contactinfo', _embed: true } }),
			fetchFromWp('feature', { query: { slug: 'latest-designs', _embed: true } }),
		]) as [any[], any[], any[], any[]]
		return { hero: hero[0], bio: bio[0], contact: contact[0], feature: feature[0] }
	},
	{
		server: false,
		lazy: false
	})
</script>
<template>
	<div class="flex h-screen flex-1 flex-col overflow-auto">
		<Hero :data="homeData?.hero" />
		<Grid :data="homeData?.feature" />
		<About :data="homeData?.bio" />
		<Contact :data="homeData?.contact" />
	</div>
</template>
