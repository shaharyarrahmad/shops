<template>
  <DefaultLayout>
    <!---- PRODUCT CARD --->
    <section id="highlighted">
      <div class="columns">
        <div class="column">
          <HighlightCard
            title="Alle benodigdheden om te starten met kweken"
            image="https://storage.googleapis.com/wassets/preview/ba/seeds__preview.jpeg"
          />
        </div>
        <div class="column is-4">
          <div class="columns is-mobile is-multiline">
            <div class="column is-12-tablet is-6-mobile">
              <HighlightCard
                title="Alle potgrond 1+1"
                image="https://storage.googleapis.com/wassets/preview/ba/seeds__preview.jpeg"
              />
            </div>
            <div class="column is-12-tablet is-6-mobile">
              <HighlightCard
                title="Nieuw in het assortiment"
                image="https://storage.googleapis.com/wassets/preview/be/compost-rol-verdeler-2-min-300x300__preview.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>
<script>
import ProductCard from '@/components/ProductCard.vue';
import CategoryCard from '@/components/CategoryCard.vue';
import BlogCard from '@/components/BlogCard.vue';
import HighlightCard from '@/components/HighlightCard.vue';
export default {
  components: { ProductCard, CategoryCard, BlogCard, HighlightCard },
};
</script>
<style></style>
