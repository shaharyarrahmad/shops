<template>
  <div
    class="container product-card-container"
    :class="product.soldOut ? 'soldout' : ''"
  >
    <g-link :to="`${productUrlPrefix}/${product.slug}`">
      <b-image
        :src="product.featuredAsset.thumbnail"
        :alt="product.name"
        ratio="1by1"
      />
    </g-link>
    <p>{{ product.name }}</p>
    <p class="mb-2">
      <strong>{{ product.lowestPrice | euro }}</strong>
    </p>

    <b-button
      v-if="product.optionGroups.length === 0"
      class="is-primary is-fullwidth product-card-button"
      :loading="isLoading"
      v-on:click="buy()"
      >{{ product.soldOut ? soldoutLabel : buyLabel }}
    </b-button>
    <g-link
      v-else
      :to="`${productUrlPrefix}/${product.slug}`"
      class="button is-primary is-fullwidth product-card-button"
    >
      {{ product.soldOut ? soldoutLabel : buyLabel }}
    </g-link>
  </div>
</template>
<script>
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
    return { isLoading: false };
  },
  methods: {
    async buy() {
      if (this.product.soldOut) {
        return;
      }
      try {
        this.isLoading = true;
        const variantId = this.product.variants[0].id;
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
