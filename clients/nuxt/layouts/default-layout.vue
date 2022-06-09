<template>
  <h1>DINGEN</h1>
  {{ global }}
  <slot />
</template>
<script setup lang="ts">
import { PreparedData } from '~/prepare-data';

const global = (await queryContent<PreparedData>().findOne()).global;
console.log('STATIC');
// console.log(global);
</script>
