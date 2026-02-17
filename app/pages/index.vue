<script setup lang="ts">
	const { fetchFromWp } = useWpApi()

	// Single source of truth for the Home Page
	const { data: homeData } = await useAsyncData('home-content', async () => {
		const [hero, bio, feature, contact] = await Promise.all([
			fetchFromWp('hero', { params: { slug: 'moments-captured-stories-untold', _embed: true } }),
			fetchFromWp('bio', { params: { slug: 'bio', _embed: true } }),
			fetchFromWp('contact', { params: { slug: 'contactinfo', _embed: true } }),
			fetchFromWp('feature', { params: { slug: 'latest-designs', _embed: true } })
		]) as [any[], any[], any[], any[]]
		return { hero: hero[0], bio: bio[0], feature: feature[0], contactInfo: contact[0] }
	})
</script>
<template>
	<div class="flex h-screen flex-1 flex-col overflow-auto">
		<Hero :data="homeData?.hero" />
		<Grid :data="homeData?.feature" />
		<About :data="homeData?.bio" />
		<Contact :data="homeData?.contactInfo" />
	</div>
</template>
