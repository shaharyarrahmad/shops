<template>
  <Layout>
    <template #hero>
      <!--      https://gist.github.com/leodrummond/bc3fbb44919a1e2d796ff2e4742514d0-->
      <section class="hero">
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
        <h1>{{ $context.global.title }}</h1>
        <h4 class="subtitle">{{ $context.home.intro_title }}</h4>
        <div v-html="$context.home.intro_text"></div>
        <br />
        <g-link
          class="button mr-4 mb-4 is-dark"
          :to="$context.home.button1_url"
        >
          {{ $context.home.button1_text }}
        </g-link>
        <g-link
          class="button mr-4 mb-4 is-dark"
          :to="$context.home.button2_url"
        >
          {{ $context.home.button2_text }}
        </g-link>
        <hr />
      </section>

      <section id="featured-products" v-if="$context.featuredProducts && $context.featuredProducts.length > 0">
        <h2>{{ $context.home.shop_section_title }}</h2>
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
        <h2>{{ $context.home.news_section_title }}</h2>

        <div class="columns is-multiline">
          <div class="column is-6"
               v-for="item of $context.news"
          >
            <figure class="b-image-wrapper image" style="height:300px;">
              <img
                :src="getSquareImage(item.image.id)"
                :alt="item.image.title"
                class="mb-4 has-ratio"
                style="height:300px;"
              />
            </figure>
            <h3>{{ item.title }}</h3>
            <div v-html="item.text" class="mb-5"></div>

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
    ProductCard
  },
  metaInfo: {
    title: 'Stefan Thelen’s anti-superhero identity'
  },
  data: () => ({
    videoUrl: undefined,
    videos: ['/video/s.mp4', '/video/logo.mp4', '/video/spiral.mp4']
  }),
  async mounted() {
    this.videoUrl = this.videos[Math.floor(Math.random() * this.videos.length)]; // Random video
    await this.$vendure.getActiveOrder();
    await hydrate(this.$context.featuredProducts, this.$vendure);
  }
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
