<script setup>
import { useUnsplash } from "@/composables/useUnsplash"
const useRandomPhoto = async () => {
	const { getRandomPhoto } = useUnsplash()
	const photo = await getRandomPhoto({
		query: "nature",
		orientation: "landscape",
	})
	console.log(photo)
}
onMounted(() => {
	useRandomPhoto()
})
</script>

<template>
	<ClientOnly>
		<div class="flex-1 bg-red-100">
			
		</div>
	</ClientOnly>
</template>
<style></style>
