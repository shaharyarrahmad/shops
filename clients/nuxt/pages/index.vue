<template>
  <h1>Whatsapppp</h1>
</template>
<script setup lang="ts">
import { AppContext } from '~/plugins/global';

onMounted(async () => {
  const { $vendure } = useNuxtApp() as AppContext;
  console.log(await $vendure.getProduct('new-balance-992'));
  console.log(await $vendure.getActiveOrder());
});
const amount = 3345;
const amount2 = 3300;
</script>
