<template>
  <Layout>
    <template #hero>
      <section class="hero is-primary is-halfheight hero-background">
        <!-- Hero content: will be in the middle -->
        <div class="hero-body">
          <div class="container has-text-centered">
            <p class="title">
              Pinelab.studio
            </p>
            <p class="subtitle">
              Demo webshop
            </p>
          </div>
        </div>
      </section>
      <br />
      <br />
    </template>

    <template #content>

      <h1 class="title">Pinelab.studio e-commerce</h1>
      <p>
        Welkom op de demo webshop van Pinelab. Je kunt hier het hele bestelprocess doorlopen, inclusief een nep-betaling. Veel plezier! Vragen of opmerkingen?
        <a href="mailto:martijn.pinelab.studio">martijn@pinelab.studio</a>
      </p>
      <br>
      <br>

      <ProductFilter
        :collections="$context.collections"
        no-collection-url=""
        :selected-collection="$context.collection"
      />

      <br />
      <div v-if="$context.collection">
        <h1 class="is-size-1">{{ $context.collection.name }}</h1>
        <p
          v-if="$context.collection.description"
          v-html="$context.collection.description"
        ></p>
      </div>
      <br />

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
    </template>
  </Layout>
</template>

<script>
import ProductCard from 'pinelab-storefront-client/lib/buefy-components/ProductCard';
import { hydrate } from 'pinelab-storefront-client';
import ProductFilter from 'pinelab-storefront-client/lib/buefy-components/ProductFilter';

export default {
  components: {
    ProductCard,
    ProductFilter
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
    await hydrate(this.$context.products, this.$vendure);
  }
};
</script>
<style>
.hero-background {
  background-image: url('/img/pinetrees.jpeg');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #999;
}
</style>
