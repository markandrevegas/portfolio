<script setup>
const { data } = await useAsyncData('home', () => {
  return queryCollection('content').path('/').first()
})
if (!data.value) {
  console.error("Content not found. Check if content/index.md exists.");
}
</script>

<template>
  <ClientOnly>
    <div class="h-[64rem">
      <ColorModeToggle />
      <ContentRenderer v-if="data" :value="data" />
      <div v-else>Loading content or content not found...</div>
    </div>
  </ClientOnly>
</template>
<style>
</style>
