<script setup lang="ts">
  const props = defineProps({
    error: Object
  })

  const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="error-container">
    <h1>{{ props.error?.statusCode }}</h1>
    <p>{{ props.error?.statusMessage }}</p>
    <button @click="handleError">Go Home</button>
  </div>
</template>