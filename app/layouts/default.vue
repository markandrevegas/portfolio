<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"

const isScrolled = ref(false)
const scrollContainer = ref<HTMLElement | null>(null)

const isClient = ref(false)

function onScroll() {
	if (!scrollContainer.value) return
	isScrolled.value = scrollContainer.value.scrollTop > 70
}

onMounted(() => {
  isClient.value = true

  if (scrollContainer.value) {
    scrollContainer.value.addEventListener("scroll", onScroll)
    onScroll()
  }
})

onBeforeUnmount(() => {
	if (scrollContainer.value) {
		scrollContainer.value.removeEventListener("scroll", onScroll)
	}
})
</script>
<template>
	<div ref="scrollContainer" class="relative flex h-screen flex-col">
		<MainMenuSidebar :is-scrolled="isScrolled" />
		<main class="flex flex-1 flex-col pt-[70px] overflow-auto no-scrollbar">
			<slot></slot>
		</main>
	</div>
</template>
