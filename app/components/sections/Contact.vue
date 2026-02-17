<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue'
	import { useWpApi } from "../../composables/useWpApi"

	const { fetchFromWp } = useWpApi()

	const contactInfoContent = ref<any>(null)
	const isLoading = ref(true)
	const iconWidth = "2rem"
	const iconHeight = "2rem"

	async function fetchContactInfo() {
		isLoading.value = true
		try {
			const response = await fetchFromWp('contact', {
				// Note: verify if slug is 'about' or 'bio' in your WP admin
				query: { slug: 'contactinfo', _embed: true }
			})
			const contactInfo = (response as any[])[0]
			if (contactInfo) {
				contactInfoContent.value = contactInfo
				console.log('contactInfoContent = ', contactInfoContent.value.acf)
			}
		} catch (error: any) {
			console.error("Fetch Error:", error.data || error.message)
		} finally {
			isLoading.value = false
		}
	}
	onMounted(() => {
		fetchContactInfo()
	})
	const header = computed(() => contactInfoContent.value?.acf?.title ?? "Default Header")
	const teaser = computed(() => contactInfoContent.value?.acf?.teaser ?? "Default teaser text goes here.")
	const twitterURL = computed(() => contactInfoContent.value?.acf.twitterurl ?? null)
	const instagramURL = computed(() => contactInfoContent.value?.instagramurl ?? null)
	const pinterestURL = computed(() => contactInfoContent.value?.pinteresturl ?? null)
	
</script>
<template>
	<div class="wrapper">
		<div class="wrapper-grid">
			<div>
				<h2 class="mb-8 font-medium">{{header}}</h2>
				<p>{{teaser}}</p>
			</div>
			<div class="flex items-center justify-start gap-8">
				<Instagram v-if="instagramURL" :width="iconWidth" :height="iconHeight" />
				<Twitter v-if="twitterURL" :width="iconWidth" :height="iconHeight" />
				<Pinterest v-if="pinterestURL" :width="iconWidth" :height="iconHeight" />
			</div>
			<div class="lg:place-self-end">
				<h3 class="my-8 font-medium sm:mt-0">Contact Information</h3>
				<p>123 Example Street, City, Country</p>
				<p>Email: markandevega@me.com</p>
				<p>Phone: +1 (555) 123-4567</p>
				<p class="mt-8">Feel free to reach out for collaborations, inquiries, or just to say hello</p>
			</div>
		</div>
	</div>
</template>
