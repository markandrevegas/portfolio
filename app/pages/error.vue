<!--pages/error.vue-->
<script setup lang="ts">
defineProps({
	error: {
		type: Object,
		required: true
	}
})
</script>
<template>
	<div class="py-20 text-center">
		<h1 class="text-4xl font-bold">{{ error.statusCode }} - {{ error.message }}</h1>
		<NuxtLink to="/" class="mt-4 inline-block text-blue-500 underline">Go Home</NuxtLink>
	</div>
</template>
