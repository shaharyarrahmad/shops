<template>
  <g-link :to="`/product/${product.slug}/`">
    <div
      class="box highlight-card is-flex is-align-items-end"
      :style="`background-image: url(${image});`"
    >
      <div>
        <h3 class="has-text-white">{{ product.name }}</h3>
        <h4 class="subtitle has-text-white">
          {{ product.lowestPrice | euro }}
        </h4>
        <CantasticButton is-div="true"> Bekijk deal </CantasticButton>
      </div>
    </div>
  </g-link>
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
  min-height: 200px;
  box-shadow: inset 0 0 0 1000px rgba(35, 57, 91, 0.3);
  background-size: cover;
  height: 100%;
}
.highlight-card:hover,
.highlight-card:focus {
  box-shadow: inset 0 0 0 1000px rgba(35, 57, 91, 0.2);
}
</style>
