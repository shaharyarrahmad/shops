<template>
  <div
    class="container product-card-container"
    :class="product.soldOut ? 'soldout' : ''"
  >
    <g-link
      :to="`${productUrlPrefix}/${product.slug}`"
      :aria-label="`${buyLabel} ${product.name}`"
    >
      <b-image :src="maybeThumbnail" :alt="product.name" ratio="1by1" />
    </g-link>
    <p>{{ product.name }}</p>
    <p class="mb-2">
      <strong>{{ product.lowestPrice | euro }}</strong>
    </p>

    <b-button
      class="is-primary is-fullwidth product-card-button"
      :loading="isLoading"
      :disabled="product.soldOut"
      v-on:click="buy()"
      >{{ product.soldOut ? soldoutLabel : buyLabel }}
    </b-button>
  </div>
</template>
<script>
import { isOutOfStock } from '../util/product.util';

export default {
  props: {
    buyLabel: {
      type: String,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
    productUrlPrefix: String,
    soldoutLabel: { default: 'Sold out' },
  },
  data() {
    return {
      isLoading: false,
      maybeThumbnail: this.product.featuredAsset?.thumbnail,
    };
  },
  methods: {
    async buy() {
      if (this.product.soldOut) {
        return;
      }
      try {
        this.isLoading = true;
        const variantId = this.product.variants.find(
          (v) => !isOutOfStock(v)
        ).id;
        await this.$vendure.addProductToCart(variantId, 1);
        this.$emitter.emit('productAdded', { variantId, quantity: 1 });
      } catch (e) {
        console.error(e);
        this.$emitter.emit('error', e);
      }
      this.isLoading = false;
    },
  },
};
</script>
<style>
.soldout {
  text-decoration: line-through;
}
.product-card-button {
  margin-top: auto;
}
.product-card-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
