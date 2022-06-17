<template>
  <DefaultLayout>
    <template #content>
      <h1>{{ $context.page.title }}</h1>
      <section class="content">
        <div v-html="$context.page.content"></div>
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
