<script setup lang="ts">
	import { computed } from 'vue'

	interface MenuItem {
		title: string
		url: string
	}
	const menu = useState<MenuItem[]>('global-menu')
	const config = useRuntimeConfig()
	const formatPath = (url: string) => {
		if (!url) return '/'
		return url.replace('https://content.local', '').replace(config.public.wpBase, '') || '/'
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

	const iconHeight = '1.5rem'
	const iconWidth = '1.5rem'
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
		<div v-if="isLoading" class="absolute top-0 right-0 bottom-0 left-0 z-50 flex flex-col items-center justify-center bg-white">
			<Loading :width="loadingIconWidth" :height="loadingIconHeight" />
		</div>
		<div class="wrapper-grid">
			<div>
				<h2 class="mb-8 font-bold">{{header}}</h2>
				<p>{{teaser}}</p>
				<p class="mt-8">{{ closer }}</p>
			</div>
			<div class="lg:place-self-end">
				<h3 class="my-8 font-bold sm:mt-0">{{ altHeader}}</h3>
				<p>{{ homeAddress }}</p>
				<p>Email: {{ personalEmail }}</p>
				<p>Phone: {{ personalPhone }}</p>
			</div>
		</div>
		<div class="wrapper-grid-3 mt-16">
			<h2 class="text-xl">Jeremias Stephens</h2>
			<div>
				<ul class="menu">
					<li v-for="(item, index) in menu" :key="item.url" :style="{ '--i': index }" class="stagger-item">
						<NuxtLink :to="formatPath(item.url)" class="block">{{ item.title }}</NuxtLink>
					</li>
				</ul>
			</div>
			<div class="flex justify-start gap-8">
				<Instagram v-if="instagramURL" :width="iconWidth" :height="iconHeight" />
				<Twitter v-if="twitterURL" :width="iconWidth" :height="iconHeight" />
				<Pinterest v-if="pinterestURL" :width="iconWidth" :height="iconHeight" />
			</div>
		</div>
	</div>
</template>
