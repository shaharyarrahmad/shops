<template>
  <Layout>
    <section
      v-if="$context.featuredProduct"
      class="hero is-halfheight main-feature"
    >
      <div class="columns is-mobile">
        <div class="column">
          <h1 class="title py-6">
            {{ $context.featuredProduct.name }}
          </h1>
          <h2></h2>
          <!--          <div class="subtitle" v-html="$context.featuredProduct.description">           </div>-->

          <g-link
            :to="`${productPrefix}$context.featuredProduct.slug`"
            class="is-info is-fullwidth button"
            style="padding: 30px"
          >
            <h2>{{ $context.featuredProduct.lowestPrice | euro }} ></h2>
          </g-link>
        </div>

        <div class="column">
          <b-image
            :src="maybe($context.featuredProduct.featuredAsset, 'preview')"
            :alt="$context.featuredProduct.name"
            ratio="1by1"
          />
        </div>
      </div>
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
import { productPrefix } from '../constants';

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
