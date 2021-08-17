<template>
  <Layout>
    <template #hero>
      <!--      https://gist.github.com/leodrummond/bc3fbb44919a1e2d796ff2e4742514d0-->
      <section class="hero is-halfheight">
        <div class="hero">
          <ClientOnly>
            <video id="bgvid" playsinline autoplay muted loop>
              <source :src="videoUrl" type="video/mp4" />
            </video>
          </ClientOnly>
        </div>
      </section>

      <br />
      <br />
    </template>

    <template #content>
      <section id="bio">
        <h1 class="title">{{ $context.data.bioTitle }}</h1>
        <p v-html="$context.data.bio"></p>
        <br />
        <g-link
          v-for="cta of $context.data.ctas"
          :key="cta.link"
          class="button mr-4 mb-4"
          :to="cta.link"
        >
          {{ cta.text }}
        </g-link>
        <hr />
        <br />
      </section>

      <section id="featured-products">
        <h1 class="title">New in shop</h1>
        <div class="columns is-multiline is-mobile">
          <div
            class="column is-half-mobile mb-4"
            v-for="product of $context.featuredProducts.slice(0, 4)"
            :key="product.slug"
          >
            <ProductCard
              :product="product"
              buy-label="Add to cart"
              product-url-prefix="/shop/product/"
            />
          </div>
        </div>
        <hr />
      </section>

      <section id="news">
        <h1 class="title">News</h1>
        <p>
          Soon more shows, more prints or whatever news you want to put here!
        </p>
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
  data: () => ({
    videoUrl: undefined,
    videos: ['/img/s.mp4', '/img/logo.mp4', '/img/spiral.mp4'],
  }),
  async mounted() {
    this.videoUrl = this.videos[Math.floor(Math.random() * this.videos.length)]; // Random video
    await this.$vendure.getActiveOrder();
    await hydrate(this.$context.featuredProducts, this.$vendure);
  },
};
</script>
<style>
.hero-background {
  background-image: url('/img/hero.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #999;
}
</style>
