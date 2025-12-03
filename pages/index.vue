<script setup>
import { useUnsplash } from "@/composables/useUnsplash"
const loading = ref(false)
const photo = ref(null)
const error = ref(null)

const loadPhoto = async () => {
	loading.value = true
	const { getRandomPhoto } = useUnsplash()

	const { data, error: fetchError } = await getRandomPhoto({
		query: "fashion",
		orientation: "portrait"
	})

	loading.value = false

	if (fetchError) {
		error.value = fetchError
		return
	}

	photo.value = data
}
onMounted(() => {
	loadPhoto()
})
</script>

<template>
	<div class="flex-1 bg-red-100 h-[calc(100vh-70px)] overflow-hidden">
		<div v-if="loading">Loading...</div>
		<div v-if="error">Error loading photo</div>
		<div v-if="photo" class="h-full w-full bg-cover bg-center" :style="{backgroundImage: `url(${photo.urls.full})`}"></div>
		<!--<NuxtImg v-if="photo" :src="photo.urls.full" :alt="photo.alt" class="h-full object-cover" />-->
	</div>
</template>
<style></style>
