<template>
  <NuxtLayout>
    <NuxtPage :key="$route.params.slug || $route.fullPath" />
  </NuxtLayout>
</template>