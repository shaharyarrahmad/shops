<template>
  <Layout>
    <section id="category-intro">
      <h1>{{ $context.collection.name }}</h1>
      <b-image :src="$context.collection.featuredAsset"></b-image>

      {{ $context.collection }}
    </section>

    <div class="columns is-multiline is-mobile">
      <div
        class="column is-half-mobile is-one-quarter-tablet mb-4"
        v-for="product of $context.products"
        :key="product.slug"
      >
        <ProductCard
          :product="product"
          buy-label="Add to cart"
          product-url-prefix="product"
          soldoutLabel="Sold out"
        />
      </div>
    </div>
  </Layout>
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
    console.log(this.$context.featuredProduct.description);
    await this.$vendure.getActiveOrder();
    await hydrate(this.$context.products, this.$vendure);
  },
  methods: {
    maybe(obj, property) {
      return obj?.[property];
    },
  },
};
</script>
<style></style>
