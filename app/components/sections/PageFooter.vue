<script setup lang="ts">
	interface MenuItem {
		title: string
		url: string
	}
	const menu = useState<MenuItem[]>("global-menu")
	const config = useRuntimeConfig()
	const formatPath = (url: string) => {
		if (!url) return "/"
		return url.replace("https://content.local", "").replace(config.public.wpBase, "") || "/"
	}
	const props = defineProps<{
		data: any
	}>()
	const twitterURL = computed(() => props.data?.acf?.twitterurl ?? null)
	const instagramURL = computed(() => props.data?.acf?.instagramurl ?? null)
	const pinterestURL = computed(() => props.data?.acf?.pinteresturl ?? null)

</script>
<template>
	<footer>
		<div class="wrapper-grid-3 mt-16">
			<h2 class="text-lg font-semibold">Jeremias Stephens</h2>
			<div>
				<ul>
					<li v-for="item in menu" :key="item.url">
						<NuxtLink :to="formatPath(item.url)" class="slide-link">
							<span class="slide-wrap text-lg font-semibold">
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
							<span class="slide-wrap text-lg font-semibold">
								<span class="slide-text">Instagram</span>
								<span class="slide-text slide-text--clone">Instagram</span>
							</span>
						</a>
					</li>
					<li>
						<a :href="twitterURL" target="_blank" class="slide-link">
							<span class="slide-wrap text-lg font-semibold">
								<span class="slide-text">Twitter</span>
								<span class="slide-text slide-text--clone">Twitter</span>
							</span>
						</a>
					</li>
					<li>
						<a :href="pinterestURL" target="_blank" class="slide-link">
							<span class="slide-wrap text-lg font-semibold">
								<span class="slide-text">Pinterest</span>
								<span class="slide-text slide-text--clone">Pinterest</span>
							</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="wrapper-grid mt-16 text-xm">
			<div><p>Copyright © 2026 Jeremias Stephens</p></div>
			<div>
				<NuxtLink to="/privacy-policy" class="block">
					<p>Privacy policy</p>
				</NuxtLink>
			</div>
		</div>
	</footer>
</template>