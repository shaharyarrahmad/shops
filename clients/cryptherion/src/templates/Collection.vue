<template>
  <Layout>
    <section id="category-intro" class="mb-6">
      <h1 class="has-text-centered pb-2">{{ $context.collection.name }}</h1>
      <img
        class="collection-banner"
        :src="maybe($context.collection.featuredAsset, 'preview')"
        :alt="`Categorie ${$context.collection.name}`"
      />
      <p v-html="$context.collection.description"></p>
      <!--      <div class="columns">
              <div class="column">
                <b-image :src="maybe($context.collection.featuredAsset, 'preview')"></b-image>
              </div>
              <div class="column">
                <p v-html="$context.collection.description"></p>
              </div>
            </div>-->
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

export default {
  components: {
    ProductCard,
  },
  async mounted() {
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
<style>
.collection-banner {
  max-height: 200px;
  width: 100%;
  object-fit: cover;
}
</style>
