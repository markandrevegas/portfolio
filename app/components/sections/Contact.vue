<script setup lang="ts">
	import { computed } from 'vue'

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
				<h2 class="mb-8 font-medium">{{header}}</h2>
				<p>{{teaser}}</p>
			</div>
			<div class="flex items-center justify-start gap-8">
				<Instagram v-if="instagramURL" :width="iconWidth" :height="iconHeight" />
				<Twitter v-if="twitterURL" :width="iconWidth" :height="iconHeight" />
				<Pinterest v-if="pinterestURL" :width="iconWidth" :height="iconHeight" />
			</div>
			<div class="lg:place-self-end">
				<h3 class="my-8 font-medium sm:mt-0">{{ altHeader}}</h3>
				<p>{{ homeAddress }}</p>
				<p>Email: {{ personalEmail }}</p>
				<p>Phone: {{ personalPhone }}</p>
				<p class="mt-8">{{ closer }}</p>
			</div>
		</div>
	</div>
</template>
