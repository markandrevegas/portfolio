<script setup lang="ts">
	import { ref } from "vue"
	// states
	const isOpen = ref(false)
	// helpers
	function toggleMenu() {
		isOpen.value = !isOpen.value
	}
	const props = defineProps({
		isScrolled: Boolean
	})
</script>

<template>
	<div>
		<header :class="props.isScrolled ? 'backdrop-blur-xl text-white bg-abyssal/40' : 'backdrop-blur-md text-abyssal'" class="fixed left-0 top-0 z-40 flex h-[70px] w-full items-center justify-between px-4 transition-colors duration-300">
			<h1 class="text-5xl uppercase tracking-widest">Tailor</h1>
			<MenuIcon @click="toggleMenu"/>
		</header>
		<!-- Drawer overlay -->
		<div v-if="isOpen" class="fixed inset-0 z-40 bg-white/50" @click="toggleMenu"></div>
		<nav class="fixed right-0 top-[70px] z-50 h-full w-full bg-white text-sky-950 transition-transform duration-300" :class="isOpen ? 'translate-x-0' : 'translate-x-full'">
			<div class="flex h-full flex-col">
				<div class="flex-1 overflow-y-scroll pb-[96px] pt-[70px]">
					<ul class="menu px-4">
						<li><NuxtLink to="/" @click="toggleMenu">Home</NuxtLink></li>
						<li><NuxtLink to="/about" @click="toggleMenu">About</NuxtLink></li>
						<li><NuxtLink to="/blog" @click="toggleMenu">Blog</NuxtLink></li>
						<li><NuxtLink to="/contact" @click="toggleMenu">Contact</NuxtLink></li>
					</ul>
				</div>
				<div class="socials fixed bottom-0 left-0 right-0 z-20 flex h-24 items-center justify-start gap-4 bg-white px-4">
					<div class="flex h-12 w-12 items-center justify-center rounded-full border border-abyssal text-xl">IG</div>
					<div class="flex h-12 w-12 items-center justify-center rounded-full border border-abyssal text-xl">PT</div>
				</div>
				<div>Copyright</div>
			</div>
		</nav>
	</div>
</template>
