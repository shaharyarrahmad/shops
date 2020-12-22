<template>
  <div>
    <div v-for="product in $context.products" :key="product.id">
      <a :href="`/product/${product.slug}`">
        <h2>{{ product.slug }}</h2>
        <AsyncImage :src="product.featuredAsset.preview"></AsyncImage>
      </a>
    </div>
    JE BENT EEN INDEX
  </div>
</template>

<script>
import {Index} from '../shared/client';

export default {
  async mounted() {
    const ding = await Index.getProductStock();
    console.log(`client side`, ding);
  }
}
</script>