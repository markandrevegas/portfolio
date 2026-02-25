<script setup lang="ts">
const { data: homeData } = await useAsyncData('home-data', async () => {
  if (process.server) {
    const { readFileSync } = await import('fs')
    const { join } = await import('path')
    
    const dataDir = join(process.cwd(), 'public/data')
    
    const heroData = JSON.parse(readFileSync(join(dataDir, 'hero.json'), 'utf-8'))
    const bioData = JSON.parse(readFileSync(join(dataDir, 'bio.json'), 'utf-8'))
    const contactData = JSON.parse(readFileSync(join(dataDir, 'contact.json'), 'utf-8'))
    const featureData = JSON.parse(readFileSync(join(dataDir, 'feature.json'), 'utf-8'))
    
    return {
      hero: Array.isArray(heroData) && heroData.length > 0 ? heroData[0] : null,
      bio: Array.isArray(bioData) && bioData.length > 0 ? bioData[0] : null,
      contact: Array.isArray(contactData) && contactData.length > 0 ? contactData[0] : null,
      feature: Array.isArray(featureData) && featureData.length > 0 ? featureData[0] : null
    }
  } else {
    // Client-side: fetch from public directory
    const [heroData, bioData, contactData, featureData] = await Promise.all([
      $fetch('/data/hero.json'),
      $fetch('/data/bio.json'),
      $fetch('/data/contact.json'),
      $fetch('/data/feature.json')
    ])
    
    return {
      hero: Array.isArray(heroData) && heroData.length > 0 ? heroData[0] : null,
      bio: Array.isArray(bioData) && bioData.length > 0 ? bioData[0] : null,
      contact: Array.isArray(contactData) && contactData.length > 0 ? contactData[0] : null,
      feature: Array.isArray(featureData) && featureData.length > 0 ? featureData[0] : null
    }
  }
})

useSeoMeta({
  title: () => "Tailor | Portfolio of JWS",
  description: () => ""
})
</script>
<template>
	<div class="flex h-screen flex-1 flex-col overflow-auto">
		<Hero v-if="homeData?.hero" :data="homeData.hero" :hasError="false" />
		<Grid v-if="homeData?.feature" :data="homeData.feature" :hasError="false" class="px-4" />
		<About v-if="homeData?.bio" :data="homeData.bio" :hasError="false" class="px-4" />
		<Contact v-if="homeData?.contact" :data="homeData.contact" :hasError="false" class="px-4" />
		<PageFooter v-if="homeData?.contact" :data="homeData.contact" :hasError="false" class="px-4 pb-4" />
	</div>
</template>
