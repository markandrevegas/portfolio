<script setup lang="ts">
	import { ref, onMounted, onBeforeUnmount, watch } from "vue"
	
	interface MenuItem {
		title: string
		url: string
	}

	const menu = useState<MenuItem[]>('global-menu', () => [])
	const { data, pending, error } = await useAsyncData('menu-' + Date.now(), () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiPrefix

  return $fetch(baseURL + '/wp-json/wp/v2/menu')
}, {
  server: false
})
	watch(data, (newData) => {
		if (newData) {
			menu.value = newData as MenuItem[]
		}
	}, { immediate: true })
	
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
			<MainMenuSidebar :is-scrolled="isScrolled" :loading="pending" :hasError="!!error" />
		</ClientOnly>
		<!-- Main scroll area -->
		<main class="flex flex-1 flex-col pt-[70px]">
			<NuxtPage />
		</main>
	</div>
</template>
