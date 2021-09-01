<template>
  <Layout>
    <template #hero>
      <section
        class="hero is-primary is-halfheight hero-background"
        :style="`background-image: url(${getDefaultImage(
          $context.home.hero_image.id
        )})`"
      >
        <!-- Hero content: will be in the middle -->
        <div class="hero-body">
          <div class="container has-text-centered">
            <p class="title">
              {{ $context.home.title }}
            </p>
            <p class="subtitle">
              {{ $context.home.subTitle }}
            </p>
          </div>
        </div>
      </section>
      <br />
      <br />
    </template>

    <template #content>
      <section id="bio">
        <h1 class="title">{{ $context.home.intro_title }}</h1>
        <p v-html="$context.home.intro_text"></p>
        <br />
        <g-link class="button mr-4 mb-4" :to="$context.home.button1_link">
          {{ $context.home.button1_text }}
        </g-link>
        <g-link class="button mr-4 mb-4" :to="$context.home.button2_link">
          {{ $context.home.button2_text }}
        </g-link>
        <hr />
        <br />
      </section>

      <section id="featured-products">
        <h1 class="title">Latest Products</h1>
        <div class="columns is-multiline is-mobile">
          <div
            class="column is-half-mobile mb-4"
            v-for="product of $context.featuredProducts.slice(0, 4)"
            :key="product.slug"
          >
            <ProductCard
              :product="product"
              buy-label="Add to cart"
              product-url-prefix="/shop/"
            />
          </div>
        </div>
        <hr />
      </section>
    </template>
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
};
</script>
<style>
.hero-background {
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #999;
}
</style>
