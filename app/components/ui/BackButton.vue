<script setup>
const props = defineProps({
	fallback: {
		type: String,
		default: "/"
	}
})

const router = useRouter()

const goBack = () => {
	if (window.history.length > 1) {
		router.back()
	} else {
		router.push(props.fallback)
	}
}
</script>

<template>
	<button @click="goBack" class="flex items-center justify-start">
		<slot>Back</slot>
	</button>
</template>
