<template>
  <DefaultLayout>
    <!-- PRODUCT CARD -->
    <template #content>
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
    </template>

    <template #fullwidth>
      <div class="columns is-centered content">
        <div class="column p-4">
          <div class="has-text-white">
            <h2 class="has-text-white">Over Wormenkwekerij Wasse</h2>
            <p>
              Wormenkwekerij Wasse is de expert op het gebied van compostwormen,
              viswormen en alles wat daar bij komt kijken. Bekijk anders
              hiernaast onze video!
            </p>
            <p>
              In samenwerking met Franky's Flora kunnen we het alternatief
              bieden voor kunstmest. Met onze natuurlijke en biologische
              producten krijgt u elk grasveldje groen en kweekt u de lekkerste
              vruchten.
            </p>
            <p>
              Wij helpen u graag met veel passie bij het nieuwe tuinieren van de
              toekomst. Op naar meer biodiversiteit!
            </p>
          </div>
        </div>
        <div class="column p-4">
          <iframe
            loading="lazy"
            src="https://www.youtube.com/embed/cLblUjpFdfU"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>
    </template>

    <template #content2>
      <section id="highlighted">
        <h4 class="title has-text-black has-text-weight-bold is-5 pt-5">
          Blog
        </h4>
        <div class="columns">
          <div class="column">
            <BlogCard
              title="Geen gezonde bodem zonder wormen"
              image="https://storage.googleapis.com/wassets/preview/ba/seeds__preview.jpeg"
              slug="geen-gezonde-bodem-zonder-wormen"
            />
          </div>
          <div class="column">
            <BlogCard
              title="Help mijn wormen ontsnappen"
              image="https://storage.googleapis.com/wassets/preview/ba/seeds__preview.jpeg"
              slug="help-mijn-wormen-ontsnappen"
            />
          </div>
        </div>
      </section>
    </template>
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
<style>
iframe {
  min-height: 200px;
}
</style>
