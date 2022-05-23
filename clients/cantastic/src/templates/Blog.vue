<template>
  <DefaultLayout>
    <template #content>
      <section id="blog">
        <h1>{{ $context.blog.title }}</h1>
        <div class="content" v-html="$context.blog.content"></div>
      </section>

      <section id="favorite-products">
        <h3>Bekijk ook onze favorieten</h3>
        <div class="columns is-6 is-variable is-multiline is-mobile">
          <template v-for="favorite of $context.favorites">
            <div class="column is-6-mobile is-4-tablet is-one-fifth-desktop">
              <ProductCard :product="favorite" />
            </div>
          </template>
        </div>
      </section>

      <section id="related-blogs">
        <h3>Meer blogs</h3>
        <div class="columns">
          <template v-for="blog of $context.relatedBlogs">
            <div class="column">
              <BlogCard :blog="blog" />
            </div>
          </template>
        </div>
      </section>
    </template>
  </DefaultLayout>
</template>

<script>
import { hydrate } from 'pinelab-storefront-client';
import BlogCard from '../components/BlogCard';

export default {
  components: {
    BlogCard,
  },
  async mounted() {
    await hydrate(this.$context.favorites, this.$vendure);
  },
};
</script>
<style>
#blog img {
  border-radius: 6px;
  margin: 1.5rem auto;
  display: block;
}
</style>
