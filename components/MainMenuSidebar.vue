<template>
	<div>
		<header class="fixed top-0 left-0 w-full z-40 backdrop-blur-md h-[70px] flex items-center justify-end px-4">
      <button class="text-2xl tracking-tighter uppercase" :aria-expanded="isOpen" aria-haspopup="true" @click="toggleMenu">
        Menu
      </button>
    </header>
    <!-- Drawer overlay -->
    <div v-if="isOpen" class="fixed inset-0 bg-white/50 z-40" @click="toggleMenu"></div>
    <div class="fixed top-0 right-0 h-full w-full bg-white text-sky-950 z-50 transition-transform duration-300" :class="isOpen ? 'translate-x-0' : 'translate-x-full'">
      <div class="flex flex-col h-full">
        <div class="w-full flex justify-between items-center h-[70px] px-4">
          <h1 class="text-5xl tracking-widest uppercase">Tailor</h1>
          <div class="flex justify-between items-center gap-2">
            <Icon name="iconoir:search" class="size-8" />
            <Icon name="iconoir:xmark" class="size-12" @click="toggleMenu" />
          </div>
        </div>
        <ul class="menu px-4">
          <li><NuxtLink to="/" @click="toggleMenu">Home</NuxtLink></li>
          <li><NuxtLink to="/about" @click="toggleMenu">About</NuxtLink></li>
          <li><NuxtLink to="/blog" @click="toggleMenu">Blog</NuxtLink></li>
          <li><NuxtLink to="/contact" @click="toggleMenu">Contact</NuxtLink></li>
        </ul>
        <div class="flex-1 bg-sky-200 grid grid-cols-2">
          <div class="bg-green-200"></div>
          <div class="bg-yellow-200"></div>
        </div>
        <div class="h-24 bg-cyan-400"></div>
      </div>
    </div>
	</div>
</template>
<script setup lang="ts">
	import { ref } from 'vue'
  // states
  const isOpen = ref(false)
  // helpers
  function toggleMenu() {
    isOpen.value = !isOpen.value
  }
</script>