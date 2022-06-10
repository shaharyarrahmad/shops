<template>
  <DefaultLayout>
    <template #content>
      <section id="404">
        <h1>404 - Deze pagina bestaat niet</h1>
        <p>Helaas, deze pagina bestaat niet....</p>
        <br />
        <br />
        <br />
      </section>

      <section id="favorite-products">
        <p>Bekijk anders een van onze favorieten:</p>
        <div class="columns is-6 is-variable is-multiline is-mobile">
          <template v-for="favorite of $context.favorites">
            <div class="column is-6-mobile is-4-tablet is-one-fifth-desktop">
              <ProductCard :product="favorite" />
            </div>
          </template>
        </div>
      </section>
    </template>
  </DefaultLayout>
</template>

<script>
import { hydrate } from 'pinelab-storefront';

export default {
  async mounted() {
    await hydrate(this.$context.favorites, this.$vendure);
  },
};
</script>
<style></style>
