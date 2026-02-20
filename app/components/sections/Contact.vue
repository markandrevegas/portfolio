<script setup lang="ts">
import { computed } from "vue"

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
	isLoading: boolean
	hasError: boolean
}>()

const loadingIconWidth = "2.5rem"
const loadingIconHeight = "2.5rem"

const header = computed(() => props.data?.acf?.title ?? "Default Header")
const teaser = computed(() => props.data?.acf?.teaser ?? "Default teaser text goes here.")
const altHeader = computed(() => props.data?.acf?.contactHeader ?? "ContactInformation")

const twitterURL = computed(() => props.data?.acf?.twitterurl ?? null)
const instagramURL = computed(() => props.data?.acf?.instagramurl ?? null)
const pinterestURL = computed(() => props.data?.acf?.pinteresturl ?? null)

const homeAddress = computed(() => props.data?.acf?.homeaddress)
const personalEmail = computed(() => props.data?.acf?.personalemail)
const personalPhone = computed(() => props.data?.acf?.personalphone)
const closer = computed(() => props.data?.acf?.closer)
</script>
<template>
	<div class="wrapper">
		<div v-if="isLoading" class="absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-white">
			<Loading :width="loadingIconWidth" :height="loadingIconHeight" />
		</div>
		<div class="wrapper-grid">
			<div>
				<h2 class="mb-8 font-bold">{{ header }}</h2>
				<p>{{ teaser }}</p>
				<p class="mt-8">{{ closer }}</p>
			</div>
			<div>
				<h3 class="my-8 font-bold sm:mt-0">{{ altHeader }}</h3>
				<p>{{ homeAddress }}</p>
				<p>Email: {{ personalEmail }}</p>
				<p>Phone: {{ personalPhone }}</p>
			</div>
		</div>
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
		<footer class="wrapper-grid-3 mt-8">
			<div><p>Copyright © 2026 Jeremias Stephens</p></div>
			<div></div>
			<div></div>
		</footer>
	</div>
</template>
