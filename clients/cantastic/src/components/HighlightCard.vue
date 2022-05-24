<template>
  <g-link :to="`/product/${product.slug}/`">
    <div
      class="box card-background-image is-flex is-align-items-end highlight-card"
      :style="`background-image: url(${image});`"
    >
      <div>
        <h3 class="has-text-white pt-5">{{ product.name }}</h3>
        <h4 class="subtitle has-text-white">
          {{ product.lowestPrice | euro }}
        </h4>
        <CantasticButton is-div="true"> Bekijk deal</CantasticButton>
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
.card-background-image.highlight-card {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>
