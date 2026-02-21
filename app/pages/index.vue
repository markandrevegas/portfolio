<script setup lang="ts">
const { fetchFromWp } = useWpApi()

// Single source of truth for the Home Page
const {
	data: homeData,
	pending,
	error
} = await useAsyncData(
	"index",
	async () => {
		const [hero, bio, contact, feature] = (await Promise.all([fetchFromWp("hero", { query: { slug: "moments-captured-stories-untold", _embed: true } }), fetchFromWp("bio", { query: { slug: "bio", _embed: true } }), fetchFromWp("contact", { query: { slug: "contactinfo", _embed: true } }), fetchFromWp("feature", { query: { slug: "latest-designs", _embed: true } })])) as [any[], any[], any[], any[]]
		// console.log(contact)
		return { hero: hero[0], bio: bio[0], contact: contact[0], feature: feature[0] }
	},
	{
		server: false,
		lazy: false
	}
)
useSeoMeta({
	title: () => "Tailor | Portfolio of JWS",
	description: () => ""
})
</script>
<template>
	<div class="flex h-screen flex-1 flex-col overflow-auto">
		<Hero v-if="homeData?.hero" :data="homeData.hero" :isLoading="pending" :hasError="!!error" />
		<Grid v-if="homeData?.feature" :data="homeData.feature" :isLoading="pending" :hasError="!!error" class="px-4" />
		<About v-if="homeData?.bio" :data="homeData.bio" :isLoading="pending" :hasError="!!error" class="px-4" />
		<Contact v-if="homeData?.contact" :data="homeData.contact" :isLoading="pending" :hasError="!!error" class="px-4" />
		<PageFooter v-if="homeData?.contact" :data="homeData.contact" :isLoading="pending" :hasError="!!error" class="px-4 pb-4" />
	</div>
</template>
