<template>
  <Layout #content>
    <br />
    <h1 class="title">{{ $context.product.name }}</h1>
    <div class="columns">
      <div class="column">
        <ProductImages :product="$context.product" :variant="variant" />
      </div>
      <div class="column">
        <h5 class="has-text-grey is-size-5">{{ variant.name }}</h5>
        <h5 class="is-size-5 mb-4">{{ variant.priceWithTax | euro }}</h5>
        <VariantSelector
          :product="$context.product"
          v-on:select="selectedVariant = $event"
        />
        <br />
        <p v-html="$context.product.description"></p>
      </div>
    </div>
  </Layout>
</template>
<script>
import ProductImages from 'pinelab-storefront-client/lib/buefy-components/ProductImages';
import VariantSelector from 'pinelab-storefront-client/lib/buefy-components/VariantSelector';

export default {
  components: {
    ProductImages,
    VariantSelector,
  },
  computed: {
    variant() {
      return this.selectedVariant || this.$context?.product.variants[0] || {};
    },
  },
  data() {
    return {
      selectedVariant: undefined,
    };
  },
};
</script>
