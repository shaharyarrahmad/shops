<template>
  <Layout>
    <Cart />
  </Layout>
</template>

<script>
import { Cart } from 'pinelab-storefront-client/lib/ministore';
export default {
  components: {
    Cart,
  },
  created() {
    this.$context.previousPage = '/';
    this.$context.hideCartIcon = true;
  },
};
</script>
