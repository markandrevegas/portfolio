<script setup lang="ts">
const iconWidth = "2rem"
const iconHeight = "2rem"
</script>
<template>
	<div class="wrapper">
		<div class="wrapper-grid">
			<div>
				<h2 class="mb-8 font-medium">Get in touch</h2>
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, in? Nobis ipsum nisi accusantium, harum molestiae quos recusandae soluta ad officiis maiores natus aliquid repellendus, nulla cum ex iure hic!</p>
			</div>
			<div class="flex items-center justify-start gap-8">
				<Instagram :width="iconWidth" :height="iconHeight" />
				<Twitter :width="iconWidth" :height="iconHeight" />
				<Pinterest :width="iconWidth" :height="iconHeight" />
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
