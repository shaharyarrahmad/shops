<template>
  <Layout>
    <template #content>
      <ProductFilter :collections="$context.collections"/>
    </template>
  </Layout>
</template>
<script>
import ProductFilter from 'pinelab-storefront-client/lib/buefy-components/ProductFilter';

export default {
  components: {
    ProductFilter
  }

};
</script>