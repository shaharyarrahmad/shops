<template>
  <div>
    <h1 class="is-size-1">Roelobeats</h1>
    <h2>products</h2>
    <img :src="$context.products[0].featuredAsset.thumbnail" />

    <br />
    {{ $context.products }}
  </div>
</template>
<script>
export default {
  async mounted() {},
};
</script>
<style></style>
