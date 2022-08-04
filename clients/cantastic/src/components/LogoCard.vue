<template>
  <div class="rounded logo-card">
    <b-image :src="logo" :alt="name" />
  </div>
</template>
<script>
export default {
  props: ['logo', 'name'],
};
</script>
<style>
.logo-card img {
  transition: transform 0.2s; /* Animation */
}
.logo-card img:hover {
  transform: scale(1.05);
}
</style>
