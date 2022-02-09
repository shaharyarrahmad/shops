<template>
  <DefaultLayout>
    <div class="columns is-multiline is-mobile">
      <div
        class="column is-half-mobile is-one-quarter-tablet mb-4"
        v-for="product of $context.products"
        :key="product.slug"
      >
        <ProductCard
          :product="product"
          buy-label="In winkelmand"
          product-url-prefix="product"
          soldoutLabel="Uitverkocht"
        />
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import ProductCard from 'pinelab-storefront-client/lib/buefy-components/ProductCard';
import { hydrate } from 'pinelab-storefront-client';
import ProductFilter from 'pinelab-storefront-client/lib/buefy-components/ProductFilter';

export default {
  components: {
    ProductCard,
    ProductFilter,
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
    await hydrate(this.$context.products, this.$vendure);
  },
};
</script>
<style></style>
