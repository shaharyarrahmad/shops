<template>
  <Layout>
    <section
      v-if="$context.featuredProduct"
      class="hero is-halfheight main-feature p-6 is-light-blue mb-2"
    >
      <div class="columns">
        <div class="column">
          <h1 class="title py-6">
            {{ $context.featuredProduct.name }}
          </h1>
          <p class="subtitle">De meests verkochte seed wallet</p>
          <g-link
            :to="`/product/${$context.featuredProduct.slug}`"
            class="is-info is-fullwidth button is-large"
            style="padding: 30px"
          >
            <h2>
              {{ $context.featuredProduct.lowestPrice | euro }}
              <span class="icon is-large ml-4"
                ><i class="mdi mdi-alert-octagram"></i
              ></span>
            </h2>
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
    <section id="usps" class="mb-6 is-dark has-background-black has-text-light">
      <div class="content has-text-centered is-medium">
        <b-icon
          class="mx-2"
          icon="check-circle"
          size="is-small"
          type="is-success"
        >
        </b-icon>
        Voor 23:00 besteld volgende dag in huis

        <b-icon
          class="mx-2"
          icon="check-circle"
          size="is-small"
          type="is-success"
        >
        </b-icon>
        Voor 23:00 besteld volgende dag in huis
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
<style></style>
