<template>
  <DefaultLayout #content>
    <h1 class="title">{{ $context.product.name }}</h1>
    <div class="columns">
      <div class="column">
        <ProductImages :product="$context.product" :variant="variant" />
      </div>
      <div class="column content">
        <h5
          v-if="$context.product.variants.length > 1"
          class="has-text-grey is-size-5"
        >
          {{ variant.name }}
        </h5>
        <h2 class="is-size-2 mb-4">{{ variant.priceWithTax | euro }}</h2>
        <VariantSelector
          v-if="$context.product.variants.length > 1"
          :product="$context.product"
          :variant="variant"
          v-on:select="selectedVariant = $event"
        />
        <br />
        <div class="columns is-mobile">
          <div class="column is-4">
            <b-numberinput v-model="quantity" :disabled="isSoldOut">
            </b-numberinput>
          </div>
          <div class="column is-8">
            <b-button
              icon-left="basket-plus"
              class="is-primary is-fullwidth"
              :loading="isLoading"
              :disabled="isSoldOut"
              aria-label="In winkelmand"
              v-on:click="buy()"
              >{{ isSoldOut ? 'Uitverkocht' : 'In winkelmand' }}
            </b-button>
          </div>
        </div>
        <br />
        <div v-html="$context.product.description"></div>
      </div>
    </div>
  </DefaultLayout>
</template>
<script>
import ProductImages from 'pinelab-storefront/lib/components/ProductImages';
import VariantSelector from 'pinelab-storefront/lib/components/VariantSelector';
import { buy, hydrate, isOutOfStock } from 'pinelab-storefront';

export default {
  components: {
    ProductImages,
    VariantSelector,
  },
  computed: {
    variant() {
      return (
        this.selectedVariant ||
        this.$context?.product.variants.find((v) => !isOutOfStock(v)) ||
        this.$context?.product.variants[0]
      );
    },
    isSoldOut() {
      return isOutOfStock(this.variant);
    },
  },
  data() {
    return {
      selectedVariant: undefined,
      isLoading: false,
      quantity: 1,
    };
  },
  async mounted() {
    await hydrate(this.$context.product, this.$vendure);
  },
  methods: {
    async buy() {
      this.isLoading = true;
      await buy(this.variant, {
        vendure: this.$vendure,
        emitter: this.$emitter,
      });
      this.isLoading = false;
    },
  },
};
</script>
<style>
.is-clickable.image {
  cursor: zoom-in !important;
}
.carousel-arrow .icon {
  border: 1px solid #333232;
  opacity: 1;
}
</style>
