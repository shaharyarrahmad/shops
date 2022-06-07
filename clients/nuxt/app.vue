<template>
  <div>
    <h1>{{ $filters.euro(amount) }}</h1>
    <h1>{{ $filters.euro(amount2) }}</h1>
    <NuxtWelcome />
  </div>
</template>
<script setup lang="ts">
onMounted(() => {
  const ding = useNuxtApp();
  console.log(ding);
})
const amount = 3345;
const amount2 = 3300;
</script>
