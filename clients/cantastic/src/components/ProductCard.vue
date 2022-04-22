<template>
  <div class="product-container mt-5">
    <g-link :to="`/product/${product.slug}/`" style="margin-bottom: -20px">
      <b-image
        :src="maybeThumbnail(product.featuredAsset)"
        :alt="product.name"
        ratio="1by1"
        class="contain-image"
      ></b-image>
      <p class="is-size-7">{{ product.category || '&nbsp;' }}</p>
      <h6>{{ product.name }}</h6>
    </g-link>
    <div class="buy-button has-text-right">
      <h5 class="is-inline-block pt-3 pr-2">
        {{ product.lowestPrice | euro }}
      </h5>
      <b-button
        type="is-info"
        size="is-medium"
        icon-right="basket-plus-outline"
        :loading="isLoading"
        @click="buyOrGoToDetails()"
      />
    </div>
  </div>
</template>
<script>
import { buy } from 'pinelab-storefront-client';

export default {
  props: ['product'],
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async buyOrGoToDetails() {
      console.log(this.product.variants.length);
      if (this.product.variants.length === 1) {
        return await this.buy(this.product.variants[0]);
      }
      await this.$router.push(`/product/${this.product.slug}/`);
    },
    async buy(variant) {
      this.isLoading = true;
      await buy(variant, {
        vendure: this.$vendure,
        emitter: this.$emitter,
      });
      this.isLoading = false;
    },
  },
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
  white-space: nowrap;
  overflow: visible;
}
.contain-image img {
  object-fit: contain;
}
</style>
