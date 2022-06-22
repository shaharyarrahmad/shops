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

      <FavoritesSection :favorites="$context.favorites" />
    </template>
  </DefaultLayout>
</template>

<script>
import { hydrate } from 'pinelab-storefront';
import FavoritesSection from '../components/FavoritesSection';

export default {
  components: { FavoritesSection },
  async mounted() {
    await hydrate(this.$context.favorites, this.$vendure);
  },
};
</script>
<style></style>
