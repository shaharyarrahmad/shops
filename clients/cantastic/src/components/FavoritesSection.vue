<template>
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
<script>
import { hydrate } from 'pinelab-storefront-client';

export default {
  props: ['favorites'],
  async mounted() {
    await hydrate(this.favorites, this.$vendure);
  },
};
</script>
