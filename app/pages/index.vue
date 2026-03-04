<script setup lang="ts">

const isTestingPending = ref(false)
const isTestingError = ref(true)

const loadingIconWidth = "2.5rem"
const loadingIconHeight = "2.5rem"

const { data: homeData, pending, error, refresh } = await useAsyncData('home-data', async () => {
  if (import.meta.server) {
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

const isPending = computed(() => isTestingPending.value || pending.value)
const hasError = computed(() => isTestingError.value || error.value)

useSeoMeta({
  title: () => "Tailor | Portfolio",
  description: () => ""
})
</script>
<template>
	<div class="flex min-h-dvh flex-1 flex-col overflow-auto">
    <div v-if="isPending" class="flex flex-1 items-center justify-center">
      <Loading :width="loadingIconWidth" :height="loadingIconHeight" />
    </div>
    <div v-else-if="hasError" class="flex flex-1 items-center justify-center">
      <div class="text-center flex flex-col gap-4">
        <h2 class="text-4xl tracking-tighter animate-slide-up" style="animation-delay:0ms;">404 - This page doesn’t exist.</h2>
        <p class="mb-4 animate-slide-up" style="animation-delay: 150ms;">{{ error?.message || 'Like a photo that was never developed, this page might have faded into the dark.' }}</p>
        <p class="flex justify-start items-center gap-2 min-w-32 mx-auto min-w-content animate-slide-up">
          <span class="inline-flex gap-2 font-semibold">Go <BackButton></BackButton></span>
          or
          <span class="font-semibold"><NuxtLink @click="() => refresh()">try again</NuxtLink></span>
        </p>
        <button @click="() => refresh()" class="hidden flex-none max-w-32 mx-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition animate-slide-up" style="animation-delay: 300ms;">Retry</button>
      </div>
    </div>
    <template v-else-if="homeData">
      <Hero v-if="homeData?.hero" :data="homeData.hero" :hasError="false" />
      <Grid v-if="homeData?.feature" :data="homeData.feature" :hasError="false" class="px-4" />
      <About v-if="homeData?.bio" :data="homeData.bio" :hasError="false" class="px-4" />
      <Contact v-if="homeData?.contact" :data="homeData.contact" :hasError="false" class="px-4" />
    </template>
    <div v-else class="flex h-full items-center justify-center px-4">
      <p class="text-gray-600">No content available.</p>
    </div>
	</div>
</template>
<style scoped>
  @keyframes slide-up {
    from {
      opacity: 0;
      filter: blur(16px);
      transform: translate3d(0, 24px, 0);
    }
    to {
      opacity: 1;
      filter: blur(0);
      transform: translate3d(0, 0, 0);
    }
  }
  .animate-slide-up {
    backface-visibility: hidden;
    contain: layout paint;
    opacity: 0;
    animation: slide-up 750ms cubic-bezier(0.25, 0.8, 0.25, 1) forwards;  will-change: transform, opacity;
    transform: translateZ(0);
  }
</style>
