<template>
  <div class="container">
    <AsyncImage :src="product.featuredAsset.thumbnail"
                :alt="product.name"
                style="width: 100%;" />
    <p>{{ product.name }}</p>
    <p class="mb-2"><strong>{{ product.lowestPrice | euro }}</strong></p>

    <b-button v-if="product.optionGroups.length === 0"
              type="is-primary is-fullwidth"
              :loading="isLoading"
              v-on:click="buy()"
    >{{ buyText }}
    </b-button>
    <g-link v-else
            :to="product.slug" class="button is-primary is-fullwidth">
      {{ buyText }}
    </g-link>
  </div>

</template>
<script>

export default {
  props: {
    buyText: {
      type: String,
      required: true
    },
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {isLoading: false}
  },
  methods: {
    async buy() {
      try {
        this.isLoading = true;
        const variantId = this.product.variants[0].id;
        await this.$vendure.addProductToCart(variantId, 1);
        this.$buefy.snackbar.open({
          // duration: 3000,
          message: 'Added item to cart',
          position: 'is-top-right',
          actionText: 'Checkout now',
          queue: false,
          onAction: () => {
            console.log('doen dan')
            this.$router.push('/cart/');
          }
        })
      } catch (e) {
        console.error(e);
      }
      this.isLoading = false;
    }
  }
};
</script>
<style>
.product-card-image {
  width: 100%;
}
</style>