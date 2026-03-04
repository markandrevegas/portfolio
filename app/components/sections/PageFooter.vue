<script setup lang="ts">
	const { data: menuItems } = await useFetch<MenuItem[]>('/data/menu.json',  {
		server: false,
		lazy: false
	})

	interface MenuItem {
		title: string
		url: string
	}
	const props = defineProps<{
		data: any
	}>()
	const twitterURL = computed(() => props.data?.acf?.twitterurl ?? null)
	const instagramURL = computed(() => props.data?.acf?.instagramurl ?? null)
	const pinterestURL = computed(() => props.data?.acf?.pinteresturl ?? null)

</script>
<template>
	<footer class="px-4">
		<div class="wrapper-grid-3">
			<h2>Tailor</h2>
			<div>
				<ul>
					<li v-for="item in menuItems" :key="item.url">
						<NuxtLink :to="item.url" class="slide-link">
							<span class="slide-wrap">
								<span class="slide-text">{{ item.title }}</span>
								<span class="slide-text slide-text--clone">{{ item.title }}</span>
							</span>
						</NuxtLink>
					</li>
				</ul>
			</div>
			<div>
				<ul>
					<li>
						<a :href="instagramURL" target="_blank" class="slide-link">
							<span class="slide-wrap font-semibold">
								<span class="slide-text">Instagram</span>
								<span class="slide-text slide-text--clone">Instagram</span>
							</span>
						</a>
					</li>
					<li>
						<a :href="twitterURL" target="_blank" class="slide-link">
							<span class="slide-wrap font-semibold">
								<span class="slide-text">Twitter</span>
								<span class="slide-text slide-text--clone">Twitter</span>
							</span>
						</a>
					</li>
					<li>
						<a :href="pinterestURL" target="_blank" class="slide-link">
							<span class="slide-wrap font-semibold">
								<span class="slide-text">Pinterest</span>
								<span class="slide-text slide-text--clone">Pinterest</span>
							</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</footer>
</template>