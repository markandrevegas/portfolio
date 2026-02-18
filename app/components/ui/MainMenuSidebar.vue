<script setup lang="ts">
	import { ref } from "vue"

	interface MenuItem {
		title: string
		url: string
	}

	const props = withDefaults(defineProps<{
		error?: boolean
		isScrolled?: boolean
		loading?: boolean
	}>(), {
		error: false,
		isScrolled: false,
		loading: false
	})
	const menu = useState<MenuItem[]>('global-menu')
	// console.log('menu from global-menu ', menu.value)
	const config = useRuntimeConfig()
	const formatPath = (url: string) => {
		if (!url) return '/'
		return url.replace('https://content.local', '').replace(config.public.wpBase, '') || '/'
	}
	
	const isOpen = ref(false)
	const iconWidth = "2rem"
	const iconHeight = "2rem"
	const loadingIconWidth = "2.5rem"
	const loadingIconHeight = "2.5rem"
	function toggleMenu() {
		isOpen.value = !isOpen.value
	}
</script>

<template>
	<div>
		<header :class="props.isScrolled ? 'bg-abyssal/40 text-white backdrop-blur-xl' : 'text-abyssal backdrop-blur-md'" class="fixed left-0 top-0 z-40 flex h-[70px] w-full items-center justify-between px-6 transition-colors duration-300">
			<NuxtLink to="/" class="block">
				<h1 class="text-xl font-bold">Tailor</h1>
			</NuxtLink>
			
			<MenuIcon :is-open="isOpen" @click="toggleMenu" />
		</header>
		<!-- Drawer overlay -->
		<ClientOnly>
			<Transition name="fade">
				<div v-if="isOpen" class="hidden fixed inset-0 z-40 bg-white/50" @click="toggleMenu"></div>
			</Transition>
			<Transition name="slide">
				<nav v-if="isOpen" class="fixed right-0 top-[70px] z-50 h-full w-full bg-palladian text-sky-950 transition-transform duration-300">
					<div class="flex h-full flex-col px-4">
						<div class="flex-1 overflow-y-scroll">
							<div v-if="error">
								Error
							</div>
							<div v-if="loading">
								<Loading :width="loadingIconWidth" :height="loadingIconHeight" />
							</div>
							<ul class="menu">
								<li v-for="(item, index) in menu" :key="item.url" :style="{ '--i': index }" class="stagger-item">
									<NuxtLink :to="formatPath(item.url)" @click="toggleMenu" class="block">{{ item.title }}</NuxtLink>
								</li>
							</ul>
							<div class="relative my-8" :style="{ '--i': 3 }">
								<div class="relative h-48 rounded-lg overflow-hidden">
									<NuxtImg 
										src="/images/color.jpeg" 
										alt="Menu Image" 
										class="w-full h-full object-cover relative z-10"
									/>
									<div class="absolute inset-0 z-20 bg-gradient-to-t from-black/80 to-transparent text-white p-4 flex flex-col justify-end">
										<p class="font-semibold drop-shadow-md">Featured Image</p>
										<p class="text-xs drop-shadow-md">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex distinctio illum sit aliquam alias pariatur.</p>
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
	transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
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
	transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
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
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
