<script setup lang="ts">
	import { ref, onMounted, onBeforeUnmount, watch } from "vue"
	
	interface MenuItem {
		title: string
		url: string
	}
	// const config = useRuntimeConfig()

	const menu = useState<MenuItem[]>('global-menu', () => [])
	const { data, pending, error } = await useAsyncData('menu', () => {
		// If we're on the server, we MUST use the full URL
		// If we're on the client, the proxy works with the relative path
		const baseURL = import.meta.server 
			? 'https://content.local' 
			: '/portfolio/api/wp'
			
		return $fetch(`${baseURL}/wp-json/wp/v2/menu`, {
			onRequestError({ error }) {
				console.error('Fetch Error:', error)
			}
		})
	})
	watch(data, (newData) => {
		if (newData) {
			menu.value = newData as MenuItem[]
		}
	}, { immediate: true })
	console.log('data ', data.value)

	
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
