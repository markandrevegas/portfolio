<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"

const isScrolled = ref(false)
const scrollContainer = ref<HTMLElement | null>(null)
function onScroll() {
	if (!scrollContainer.value) return
	isScrolled.value = scrollContainer.value.scrollTop > 70
}

onMounted(() => {
	if (scrollContainer.value) {
		scrollContainer.value.addEventListener("scroll", onScroll)
	}
})

onBeforeUnmount(() => {
	if (scrollContainer.value) {
		scrollContainer.value.removeEventListener("scroll", onScroll)
	}
})
</script>
<template>
	<div ref="scrollContainer" class="relative flex h-screen flex-col overflow-auto">
		<ClientOnly>
			<MainMenuSidebar :is-scrolled="isScrolled" />
		</ClientOnly>
		<!-- Main scroll area -->
		<main class="flex flex-1 flex-col pt-[70px]">
			<NuxtPage />
		</main>
	</div>
</template>
