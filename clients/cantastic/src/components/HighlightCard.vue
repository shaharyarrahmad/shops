<template>
  <div
    class="box highlight-card is-flex is-align-items-end"
    :style="`background-image: url(${image});`"
  >
    <div>
      <h3 class="has-text-light">{{ product.name }}</h3>
      <h4 class="subtitle has-text-light">{{ product.lowestPrice | euro }}</h4>
      <CantasticButton :to="`/product/${product.slug}/`">
        Bekijk deal ></CantasticButton
      >
    </div>
  </div>
</template>
<script>
import CantasticButton from './CantasticButton';
export default {
  components: { CantasticButton },
  props: ['product'],
  computed: {
    image() {
      return this.product?.featuredAsset?.preview;
    },
  },
};
</script>
<style>
.highlight-card {
  min-height: 240px;
  box-shadow: inset 0 0 0 2000px rgba(35, 57, 91, 0.3);
  background-size: cover;
  height: 100%;
}
</style>
