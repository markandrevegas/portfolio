<script setup>
  import { ref } from 'vue'
  // states
  const isOpen = ref(false)
  // helpers
  function toggleMenu() {
    isOpen.value = !isOpen.value
  }
</script>
<template>
	<div class="relative min-h-screen bg-white dark:bg-abyssal dark:text-yellow-100 overflow-y-scroll">
    <header class="fixed top-0 left-0 w-full z-40 backdrop-blur-md border-b border-black/10 h-14 flex items-center justify-end px-4">
      <button class="text-xl uppercase" :aria-expanded="isOpen" aria-haspopup="true" @click="toggleMenu">
        Menu
      </button>
    </header>
    <!-- Drawer overlay -->
    <div v-if="isOpen" class="fixed inset-0 bg-white/50 z-40" @click="toggleMenu"></div>
    <div class="fixed top-0 right-0 h-full w-full bg-white text-sky-950 z-50 transition-transform duration-300" :class="isOpen ? 'translate-x-0' : 'translate-x-full'">
      <div class="p-2">
        <div class="flex justify-end">
          <Icon name="iconoir:xmark" class="size-10" @click="toggleMenu" />
        </div>

        <ul class="space-y-4">
          <li class="uppercase text-4xl font-light"><NuxtLink to="/">Style</NuxtLink></li>
        </ul>
      </div>
    </div>
		<!-- Main scroll area -->
    <main class="pt-14">
      <NuxtPage />
    </main>
	</div>
</template>