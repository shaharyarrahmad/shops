<template>
  <div class="container" :class="product.soldOut ? 'soldout' : ''">
    <g-link :to="product.slug">
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
      type="is-primary is-fullwidth"
      :loading="isLoading"
      v-on:click="buy()"
      >{{ product.soldOut ? soldoutLabel : buyLabel }}
    </b-button>
    <g-link v-else :to="product.slug" class="button is-primary is-fullwidth">
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

.soldout {
  text-decoration: line-through;
}
</style>
