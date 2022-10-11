<template>
  <DefaultLayout>
    <!---- PRODUCT CARD --->
    <div class="columns">
      <template v-for="product of 2">
        <div class="column">
          <BlogCard
            title="Geen gezonde wormen zonder tuin"
            title.slug="geen-gezonde-wormen-zonder-tuin"
            image="https://storage.googleapis.com/wassets/preview/ba/seeds__preview.jpeg"
          ></BlogCard>
        </div>
      </template>
    </div>
  </DefaultLayout>
</template>
<script>
import ProductCard from '@/components/ProductCard.vue';
import CategoryCard from '@/components/CategoryCard.vue';
import BlogCard from '@/components/BlogCard.vue';
export default {
  components: { ProductCard, CategoryCard, BlogCard },
};
</script>
