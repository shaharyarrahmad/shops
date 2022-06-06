<template>
  <div>
<!--    <h1>{{ amount | euro }}</h1>
    <h1>{{ $euro(amount2) }}</h1>-->
    <NuxtWelcome />
  </div>
</template>
<script setup lang="ts">
const amount = 3345;
const amount2 = 3300;
console.log(this);
</script>
