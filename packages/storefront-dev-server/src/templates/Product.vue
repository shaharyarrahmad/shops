<template>
  <Layout #content>
    <br>
    <h1 class="title mb-0">{{ $context.product.name }} </h1>
    <h5 class="has-text-grey is-size-5 mb-2">({{ variantName }})</h5>
    <div class="columns">
      <div class="column">
        <ProductImages :product="$context.product"
                       :variant="variant"
        />
      </div>
      <div class="column">
        <VariantSelector :product="$context.product" v-on:select="variant = $event" />
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
    VariantSelector
  },
  methods: {
    select(event) {
      console.log(event);
    },
    getVariantName() {
      return this.variant?.name;
    }
  },
  computed: {
    variantName() {
      return this.variant?.name || this.$context?.product.variants[0].name;
    },
  },
  data() {
    return {
      variant: this.$context?.product.variants[0]
    }
  }
};
</script>
