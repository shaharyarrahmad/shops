<template>
  <div class="product-container mt-5">
    <g-link :to="`/product/${slug}/`" style="margin-bottom: -10px">
      <b-image :src="image" :alt="name" ratio="1by1"></b-image>
      <p class="has-text-">{{ category || '&nbsp;' }}</p>
      <h6>{{ name }}</h6>
    </g-link>
    <div class="buy-button has-text-right">
      <h4 class="is-inline-block pt-3 pr-2">{{ price | euro }}</h4>
      <b-button
        type="is-info"
        size="is-medium"
        icon-right="basket-plus-outline"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ['image', 'name', 'price', 'slug', 'category'],
};
</script>
<style>
.product-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 20px;
}
.product-container a {
  color: unset;
}
.buy-button {
  margin-top: auto;
}
</style>
