<template>
  <DefaultLayout>
    <template #content>
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
      <h5>widthh</h5>
      <h5>widthh</h5>
      <h5>widthh</h5>
      <h5>widthh</h5>
      <h5>widthh</h5>
      <h5>widthh</h5>
      <h5>widthh</h5>
      <h5>widthh</h5>
      <h5>widthh</h5>
      <h5>widthh</h5>
      <h5>widthh</h5>
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

export default {
  components: {
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
