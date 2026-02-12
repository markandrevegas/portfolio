<script setup lang="ts">
import { ref } from "vue"

const isOpen = ref(false)
const props = defineProps({
	isScrolled: Boolean
})
// Define links to loop through for the stagger effect
const menuLinks = [
  { name: 'Work', to: '/' },
  { name: 'About', to: '/' },
  { name: 'Contact', to: '/' }
]
function toggleMenu() {
	isOpen.value = !isOpen.value
}
</script>

<template>
	<div>
		<header :class="props.isScrolled ? 'bg-abyssal/40 text-white backdrop-blur-xl' : 'text-abyssal backdrop-blur-md'" class="fixed left-0 top-0 z-40 flex h-[70px] w-full items-center justify-between px-4 transition-colors duration-300">
			<h1 class="text-xl">Tailor</h1>
			<MenuIcon :is-open="isOpen" @click="toggleMenu" />
		</header>
		<!-- Drawer overlay -->
		<ClientOnly>
			<Transition name="fade">
				<div v-if="isOpen" class="hidden fixed inset-0 z-40 bg-white/50" @click="toggleMenu"></div>
			</Transition>
			<Transition name="slide">
				<nav v-if="isOpen" class="fixed right-0 top-[70px] z-50 h-full w-full bg-white text-sky-950 transition-transform duration-300" :class="isOpen ? 'translate-x-0' : 'translate-x-full'">
					<div class="flex h-full flex-col">
						<div class="flex-1 overflow-y-scroll">
							<ul class="menu px-4">
								<li v-for="(link, index) in menuLinks" :key="link.name" :style="{ '--i': index }" class="stagger-item">
									<NuxtLink :to="link.to" @click="toggleMenu" class="block">{{ link.name }}</NuxtLink>
								</li>
							</ul>
						</div>
						<div class="socials fixed bottom-0 left-0 right-0 z-20 flex h-24 items-center justify-start gap-4 bg-white px-4">
							<div class="flex h-12 w-12 items-center justify-center rounded-full border border-abyssal text-xl">IG</div>
							<div class="flex h-12 w-12 items-center justify-center rounded-full border border-abyssal text-xl">PT</div>
						</div>
						<div>Copyright</div>
					</div>
				</nav>
			</Transition>
		</ClientOnly>
	</div>
</template>
<style scoped>
/* 1. MAIN DRAWER (The "Nav") */
.slide-enter-active,
.slide-leave-active {
  /* Smooth transition for the container */
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
}
/* Delay the drawer's exit until items fade out */
.slide-leave-active {
  transition-delay: 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
/* 2. OVERLAY FADE */
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
/* 3. MENU ITEMS (The "ul li") */
/* This is the state when the menu is fully OPEN */
.stagger-item {
  opacity: 1;
  transform: translateX(0);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
}
/* ENTER START: Where the items start from when the drawer opens */
.slide-enter-from .stagger-item {
  opacity: 0;
  transform: translateX(30px);
}
/* ENTER ACTIVE: The animation coming in */
.slide-enter-active .stagger-item {
  /* Added a delay so items wait for the drawer to slide in first */
  transition-delay: calc(var(--i) * 0.1s + 0.3s);
}
/* LEAVE START: Where the items start from when closing (Current state) */
.slide-leave-from .stagger-item {
  opacity: 1;
  transform: translateX(0);
}
/* LEAVE ACTIVE: The animation going out */
.slide-leave-active .stagger-item {
  opacity: 0;
  transform: translateX(20px);
  /* Reverse stagger: last item leaves first */
  transition-delay: calc((2 - var(--i)) * 0.08s);
  transition-duration: 0.3s;
}
</style>
