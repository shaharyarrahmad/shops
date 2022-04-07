<template>
  <DefaultLayout>
    <template #content>
      <div
        class="usps is-flex-desktop is-vcentered is-justify-content-space-between"
      >
        <template v-for="usp of $context.usps">
          <div class="is-flex">
            <b-icon
              icon="crown-circle"
              size="is-medium"
              type="is-info"
              class="is-vcentered"
            ></b-icon>
            <div v-html="usp" class="pl-2"></div>
          </div>
        </template>
      </div>

      <br />

      <div class="columns" id="highlighted">
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

      <h5>Content</h5>
      <h5>Content</h5>
      <h5>Content</h5>
      <h5>Content</h5>
      <h5>Content</h5>
      <h5>Content</h5>
      <h5>Content</h5>
      <h5>Content</h5>
      <h5>Content</h5>
      <h5>Content</h5>
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
      <h5>Content</h5>
      <h5>Content</h5>
      <h5>Content</h5>
      <h5>Content</h5>
      <h5>Content</h5>
      <h5>Content</h5>
      <h5>Content</h5>
      <h5>Content</h5>
      <h5>Content</h5>
    </template>
  </DefaultLayout>
</template>

<script>
import ProductCard from 'pinelab-storefront-client/lib/buefy-components/ProductCard';
import { hydrate } from 'pinelab-storefront-client';
import ProductFilter from 'pinelab-storefront-client/lib/buefy-components/ProductFilter';
import HighlightCard from '../components/HighlightCard';

export default {
  components: {
    HighlightCard,
    ProductCard,
    ProductFilter,
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
    await hydrate(this.$context.products, this.$vendure);
  },
};
</script>
<style></style>
