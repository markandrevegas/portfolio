<script setup lang="ts">
import { ref } from "vue"

const { data: menuItems } = await useFetch<MenuItem[]>('/data/menu.json',  {
  server: false,
	lazy: false
})

interface MenuItem {
	title: string
	url: string
}

interface FirstPage {
  id: number
  slug: string
  date: string
  title: string
  acf: {
    title: string
    teaser: string
    image: {
      url: string
      alt?: string
      sizes?: WpImageSizes
    } | null
  }
}

const { data: firstPage } = await useAsyncData('latest-page', async () => {
  if (import.meta.server) {
    const { readFileSync } = await import('fs')
    const { join } = await import('path')
    
    const firstPath = join(process.cwd(), 'public/data/latest-page.json')
    return JSON.parse(readFileSync(firstPath, 'utf-8'))
  } else {
    return await $fetch<FirstPage>('/data/latest-page.json')
  }
})

const imageSrcset = computed(() => {
  if (!firstPage.value?.acf?.image?.sizes) return undefined
  return generateSrcset(firstPage.value.acf.image.sizes)
})

const mainSrc = computed(() => {
  const img = firstPage.value?.acf?.image
  if (img?.sizes) {
    return img.sizes['large'] || img.sizes['medium_large'] || img.url
  }
  return img?.url || '/images/color.jpeg'
})

const props = withDefaults(
	defineProps<{
		error?: boolean
		isScrolled?: boolean
		loading?: boolean
	}>(),
	{
		error: false,
		isScrolled: false,
		loading: false
	}
)

const isOpen = ref(false)
const iconWidth = "2rem"
const iconHeight = "2rem"
const loadingIconWidth = "2.5rem"
const loadingIconHeight = "2.5rem"

const toggleMenu = () => {
	isOpen.value = !isOpen.value
}
const closeMenu = () => {
	if (isOpen.value) {
		isOpen.value = false
	}
}
const filteredMenuItems = computed(() => {
  if (!menuItems.value) return []
  return menuItems.value.filter(item => !item.url.includes('privacy-policy'))
})
</script>

<template>
	<div>
		<header :class="props.isScrolled ? 'bg-abyssal/20 text-white backdrop-blur-lg' : 'text-abyssal dark:text-palladian backdrop-blur'" class="fixed left-0 top-0 z-40 flex h-[70px] w-full items-center justify-between px-6 transition-colors duration-300">
			<NuxtLink to="/" class="block" @click="closeMenu">
				<h1 class="text-xl font-bold">Stitched</h1>
			</NuxtLink>
			<nav class="hidden md:flex items-center gap-8">
				<ul class="flex items-center gap-8">
					<li v-for="item in filteredMenuItems" :key="item.url">
						<NuxtLink :to="item.url">
							<span class="slide-link">
								<span class="slide-wrap font-semibold">
									<span class="slide-text">{{ item.title }}</span>
									<span class="slide-text slide-text--clone">{{ item.title }}</span>
								</span>
							</span>
						</NuxtLink>
					</li>
				</ul>
			</nav>
			<ClientOnly><ColorModeToggle /></ClientOnly>
			<div class="md:hidden">
				<MenuIcon :is-open="isOpen" @click="toggleMenu" />
			</div>
		</header>
		
		<Transition name="fade">
			<div v-if="isOpen" class="fixed inset-0 top-[70px] z-40 bg-black/50" @click="toggleMenu"></div>
		</Transition>
		<Transition name="slide">
			<nav v-if="isOpen" class="fixed right-0 top-[70px] z-50 h-full w-3/4 sm:w-2/3 md:w-1/3 bg-palladian text-abyssal transition-transform duration-300">
				<div class="flex h-full flex-col px-4 pt-16">
					<div class="flex-1 overflow-y-scroll">
						<div v-if="error">Error</div>
						<div v-if="loading">
							<Loading :width="loadingIconWidth" :height="loadingIconHeight" />
						</div>
						<ul class="menu">
							<li v-for="(item, index) in menuItems" :key="item.url" :style="{ '--i': index }" class="stagger-item">
								<NuxtLink :to="item.url" @click="toggleMenu" class="block">{{ item.title }}</NuxtLink>
							</li>
						</ul>
						<div class="relative my-8" :style="{ '--i': 3 }">
							<div class="relative h-48 overflow-hidden rounded-lg">
								<img v-if="firstPage.acf.image" :src="mainSrc" :srcset="imageSrcset" sizes="(max-width: 640px) 100vw, 400px" :alt="firstPage.acf.image.alt || firstPage.acf.title" class="relative z-10 h-full w-full object-cover" />
								<NuxtImg v-else :src="getAssetPath('/images/color.jpeg')" alt="Menu Image" class="relative z-10 h-full w-full object-cover" />
								<div class="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
									<p class="font-semibold drop-shadow-md">{{ firstPage.acf.title }}</p>
									<p class="text-xs drop-shadow-md">{{ truncateText(firstPage.acf.teaser, 60) }}</p>
								</div>
							</div>
						</div>
						<div class="flex items-center justify-start gap-8">
							<Instagram :width="iconWidth" :height="iconHeight" />
							<Twitter :width="iconWidth" :height="iconHeight" />
							<Pinterest :width="iconWidth" :height="iconHeight" />
						</div>
					</div>
				</div>
			</nav>
		</Transition>
	</div>
</template>
<style scoped>

</style>
