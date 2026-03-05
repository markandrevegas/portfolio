<script setup>
	defineProps({
	})
</script>
<template>
	<div class="relative h-[calc(100vh-70px)] w-full overflow-hidden bg-palladian">
  
		<div class="absolute inset-0 flex items-center justify-center z-10">
			<h1 class="text-7xl font-medium tracking-tight text-gray-900">
				Stitched
			</h1>
		</div>

		<div class="absolute top-[10%] right-[30%] w-44 md:w-56">
			<img src="/images/sunglasses.jpeg" alt="Editorial 1" class="w-full h-auto object-cover" />
		</div>

		<div class="absolute top-[45%] left-[15%] w-56 md:w-72 z-20">
			<img src="/images/sunglasses.jpeg" alt="Editorial 2" class="w-full h-auto object-cover" />
		</div>

		<div class="absolute bottom-[15%] right-[10%] w-64 md:w-80">
			<img src="/images/sunglasses.jpeg" alt="Editorial 3" class="w-full h-auto object-cover" />
		</div>

	</div>
</template>


