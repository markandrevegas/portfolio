<script setup lang="ts">
import { ref } from "vue"

const { data: menuItems } = await useFetch<MenuItem[]>('/data/menu.json', {
  server: false,
  lazy: true
})

interface MenuItem {
	title: string
	url: string
}

interface LatestPage {
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

const { data: latestPage } = await useAsyncData('latest-page', async () => {
  if (import.meta.server) {
    const { readFileSync } = await import('fs')
    const { join } = await import('path')
    
    const latestPath = join(process.cwd(), 'public/data/latest-page.json')
    return JSON.parse(readFileSync(latestPath, 'utf-8'))
  } else {
    return await $fetch<LatestPage>('/data/latest-page.json')
  }
})

const imageSrcset = computed(() => {
  if (!latestPage.value?.acf?.image?.sizes) return undefined
  return generateSrcset(latestPage.value.acf.image.sizes)
})

const mainSrc = computed(() => {
  const img = latestPage.value?.acf?.image
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
</script>

<template>
	<div>
		<header :class="props.isScrolled ? 'bg-abyssal/20 text-white backdrop-blur-lg' : 'text-abyssal backdrop-blur'" class="fixed left-0 top-0 z-40 flex h-[70px] w-full items-center justify-between px-6 transition-colors duration-300">
			<NuxtLink to="/" class="block" @click="closeMenu">
				<h1 class="text-xl font-bold">Stitched</h1>
			</NuxtLink>

			<MenuIcon :is-open="isOpen" @click="toggleMenu" />
		</header>
		<!-- Drawer overlay -->
		<ClientOnly>
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
									<img v-if="latestPage.acf.image" :src="mainSrc" :srcset="imageSrcset" sizes="(max-width: 640px) 100vw, 400px" :alt="latestPage.acf.image.alt || latestPage.acf.title" class="relative z-10 h-full w-full object-cover" />
									<NuxtImg provider="ipx" :src="getAssetPath('/images/color.jpeg')" alt="Menu Image" class="relative z-10 h-full w-full object-cover" />
									<div class="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
										<p class="font-semibold drop-shadow-md">{{ latestPage.acf.title }}</p>
										<p class="text-xs drop-shadow-md">{{ latestPage.acf.teaser }}</p>
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
		</ClientOnly>
	</div>
</template>
<style scoped>
/* 1. MAIN DRAWER PANEL (The last to leave) */
.slide-enter-active,
.slide-leave-active {
	/* Smooth easing from the video */
	transition:
		transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
		opacity 0.6s ease;
}

.slide-leave-active {
	/* Action 3: Panel waits for Image (0.2s) + Items (0.2s) = 0.4s total delay */
	transition-delay: 0.4s;
}

.slide-enter-from,
.slide-leave-to {
	transform: translateX(100%);
	opacity: 0;
}

/* 2. STAGGERED ITEMS (The "ul li" and "NuxtImg") */
.stagger-item {
	opacity: 1;
	transform: translateX(0);
	transition:
		transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
		opacity 0.5s ease;
}

/* Enter Animation (The "Open" sequence) */
.slide-enter-from .stagger-item {
	opacity: 0;
	transform: translateX(30px);
}

.slide-enter-active .stagger-item {
	/* Items slide in after the panel starts */
	transition-delay: calc(var(--i) * 0.1s + 0.3s);
}

/* Leave Animation (The "Close" sequence) */
.slide-leave-active .stagger-item {
	opacity: 0;
	transform: translateX(20px);
	transition-duration: 0.3s;
}

/* Specific Staggering for the Exit Sequence */
/* Action 1: The Image (index 3) fades out immediately */
.slide-leave-active .stagger-item[style*="--i: 3"] {
	transition-delay: 0s;
}

/* Action 2: Menu items (indices 0, 1, 2) wait 200ms for the image to fade */
.slide-leave-active .stagger-item:not([style*="--i: 3"]) {
	/* Reverse stagger starting at 200ms */
	transition-delay: calc(0.2s + (2 - var(--i)) * 0.05s);
}

/* 3. OVERLAY FADE */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
