<template>
  <h1>producttt</h1>
  <h1>{{ $route.params.slug }}</h1>
  <h1>{{ hello }}</h1>
</template>
<script setup lang="ts">
// FIXME: use Nuxt content
queryContent();
const hello = await useFetch('/api/shopdata');
console.log('AFter fetchh');
</script>
