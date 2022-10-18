<template>
  <DefaultLayout>
    <!-- PRODUCT CARD -->
    <section id="highlighted">
      <div class="columns">
        <div class="column">
          <HighlightCard
            title="Alle benodigdheden om te starten met kweken"
            image="https://storage.googleapis.com/wassets/preview/ba/seeds__preview.jpeg"
            slug="alle-benodigdheden-om-te-starten-met-kweken"
          />
        </div>
        <div class="column is-4">
          <div class="columns is-mobile is-multiline">
            <div class="column is-12-tablet is-6-mobile">
              <HighlightCard
                title="Alle potgrond 1+1"
                image="https://storage.googleapis.com/wassets/preview/ba/seeds__preview.jpeg"
                slug="alle-potgrond-1+1"
              />
            </div>
            <div class="column is-12-tablet is-6-mobile">
              <HighlightCard
                title="Nieuw in het assortiment"
                image="https://storage.googleapis.com/wassets/preview/be/compost-rol-verdeler-2-min-300x300__preview.jpg"
                slug="nieuw-in-het-assortiment"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="popular-categories">
      <h4 class="title has-text-black has-text-weight-bold is-5 pt-5">
        Populaire categorieën
      </h4>
      <div class="columns is-multiline is-mobile">
        <template v-for="index in 5">
          <div class="column is-4-mobile is-one-fifth-desktop">
            <CategoryCard
              title="Boeken worm"
              image="https://storage.googleapis.com/wassets/preview/36/ebooks__preview.jpeg"
              slug="boeken-en-ebooks"
            />
          </div>
        </template>
      </div>
    </section>
    <section id="popular-products">
      <h4 class="title has-text-black has-text-weight-bold is-5 pt-5">
        Populaire producten
      </h4>
      <div class="columns is-multiline is-mobile">
        <template v-for="index in 5">
          <div class="column is-4-mobile is-one-fifth-desktop">
            <ProductCard
              title="Wormenkwekerij stickers"
              image="https://storage.googleapis.com/wassets/preview/36/ebooks__preview.jpeg"
              slug="wormenkwekerij-stickers"
              price="14900"
            />
          </div>
        </template>
      </div>
    </section>

    <section id="about-section">
      <div class="has-background-primary">
        <div class="container is-widescreen section">
          <div class="columns is-vcentered content">
            <div class="column">
              <div class="has-text-white">
                <div>
                  Wormenkwekerij Wasse is de expert op het gebied van
                  compostwormen, viswormen en alles wat daar bij komt kijken.
                  Bekijk hiernaast anders onze video! In samenwerking met
                  Franky's Flora kunnen we het alternatief bieden voor
                  kunstmest. Met onze natuurlijke en biologische producten
                  krijgt u elk grasveldje groen en kweekt u de lekkerste
                  vruchten. Wij helpen u graag met veel passie bij het nieuwe
                  tuinieren van de toekomst. Op naar meer biodiversiteit!
                </div>
              </div>
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
