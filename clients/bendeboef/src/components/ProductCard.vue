<template>
  <div class="container">
    <AsyncImage
      :src="product.featuredAsset.thumbnail"
      :alt="product.name"
      style="width: 100%"
    />
    <p>{{ product.name }}</p>
    <p class="mb-2">
      <strong>{{ product.lowestPrice | euro }}</strong>
    </p>

    <b-button
      v-if="product.optionGroups.length === 0"
      type="is-primary is-fullwidth"
      :loading="isLoading"
      v-on:click="buy()"
      >{{ buyText }}
    </b-button>
    <g-link v-else :to="product.slug" class="button is-primary is-fullwidth">
      {{ buyText }}
    </g-link>
  </div>
</template>
<script>
export default {
  props: {
    buyText: {
      type: String,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { isLoading: false };
  },
  methods: {
    async buy() {
      try {
        this.isLoading = true;
        const variantId = this.product.variants[0].id;
        await this.$vendure.addProductToCart(variantId, 1);
        this.$emitter.emit('productAdded', { variantId, quantity: 1 });
      } catch (e) {
        console.error(e);
        this.$buefy.toast.open({
          message: `Error: ${e?.message}`,
          type: 'is-danger',
        });
      }
      this.isLoading = false;
    },
  },
};
</script>
<style>
.product-card-image {
  width: 100%;
}
</style>
