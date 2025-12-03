<script setup></script>
<template>
	<div class="relative flex h-screen flex-col overflow-auto">
		<MainMenuSidebar />
		<!-- Main scroll area -->
		<main class="flex flex-1 flex-col pt-[70px]">
			<NuxtPage />
		</main>
	</div>
</template>
