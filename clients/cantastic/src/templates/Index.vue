<template>
  <DefaultLayout>
    <template #content>
      <section id="highlighted">
        <div class="columns">
          <div class="column is-7">
            <HighlightCard :product="$context.highlight1" />
          </div>
          <div class="column is-5">
            <div class="columns is-mobile is-multiline">
              <div class="column is-12-tablet is-6-mobile">
                <HighlightCard :product="$context.highlight2" />
              </div>
              <div class="column is-12-tablet is-6-mobile">
                <HighlightCard :product="$context.highlight3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="popular">
        <h3>Populaire categorieën</h3>
        <div class="columns is-multiline is-mobile">
          <template v-for="collection of $context.collections.slice(0, 5)">
            <div class="column is-6-mobile is-4-tablet is-one-fifth-desktop">
              <g-link :to="`/categorie/${collection.slug}/`">
                <CategoryCard
                  :name="collection.name"
                  :image="maybeThumbnail(collection.featuredAsset)"
                />
              </g-link>
            </div>
          </template>
        </div>
      </section>

      <section id="favorite-products">
        <h3>Onze favorieten</h3>
        <div class="columns is-6 is-variable is-multiline is-mobile">
          <template v-for="favorite of $context.favorites">
            <div class="column is-6-mobile is-4-tablet is-one-fifth-desktop">
              <ProductCard :product="favorite" />
            </div>
          </template>
        </div>
      </section>
    </template>

    <template #fullwidth>
      <div class="columns is-vcentered">
        <div class="column">
          <h2 class="has-text-light">Over Cantastic.nl</h2>
          <p class="has-text-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            finibus, mauris non facilisis lacinia, quam ipsum lobortis quam, eu
            euismod risus mi ac lorem. Morbi faucibus ex in ex pulvinar sodales.
            Pellentesque porttitor imperdiet euismod. Quisque at porttitor sem,
            at congue eros. Suspendisse sollicitudin est vel lorem aliquam
            lacinia. In efficitur nibh eget rhoncus mollis. Suspendisse cursus
            convallis dui, vel ullamcorper arcu dictum ut. Nam ac libero est.
            Nunc nec tincidunt nisl. Donec a posuere enim. Nam vitae luctus
            nisl. Aliquam ornare, urna quis imperdiet tristique, lorem tellus
            sagittis ligula, nec mollis lectus mauris quis nisi.
          </p>
        </div>
        <div class="column p-6">
          <img src="/img/cantastic-white.png" alt="Cantastic logo" />
        </div>
      </div>
    </template>

    <template #content2>
      <section id="blog">
        <h3>Blog</h3>
        <p>TODO</p>
        <div v-for="blog of $context.blogs">
          <div
            class="box card-background-image has-text-centered"
            :style="`background-image: url(${getSquareImage(
              blog.featured_image.id
            )});`"
          ></div>
        </div>
      </section>

      <section id="brands">
        <h3>Onze merken</h3>
        <p>TODO</p>
      </section>
    </template>
  </DefaultLayout>
</template>

<script>
import { hydrate } from 'pinelab-storefront-client';
import HighlightCard from '../components/HighlightCard';

export default {
  components: {
    HighlightCard,
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
    await hydrate(this.$context.favorites, this.$vendure);
  },
};
</script>
<style></style>
