<template>
  <Layout>
    <ProductOverview/>
  </Layout>
</template>

<script>
import {ProductOverview} from 'shared-components';

export default {
  components: {
    ProductOverview
  },
  created() {
    // Reverse order so most recent is on top
    this.$context.products = this.$context.products.reverse();
  }
}
</script>