<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
  .page-enter-active,
	.page-leave-active {
		transition:
			opacity 0.4s ease,
			transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.page-enter-from,
	.page-leave-to {
		opacity: 0;
		transform: scale(0.98);
	}
</style>