<template>
  <Layout>
    <Order />
  </Layout>
</template>
<script>
import { Order } from 'pinelab-storefront-client/ministore';

export default {
  components: {
    Order,
  },
  created() {
    this.$context.previousPage = '/';
    this.$context.hideCartIcon = true;
  },
};
</script>
