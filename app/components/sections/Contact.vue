<script setup lang="ts">
import { computed } from "vue"

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
				<p class="max-w-96">{{ teaser }}</p>
				<p class="mt-8 max-w-96">{{ closer }}</p>
			</div>
			<div>
				<h3 class="my-8 font-bold sm:mt-0">{{ altHeader }}</h3>
				<p>{{ homeAddress }}</p>
				<p>Email: {{ personalEmail }}</p>
				<p>Phone: {{ personalPhone }}</p>
			</div>
		</div>
	</div>
</template>
