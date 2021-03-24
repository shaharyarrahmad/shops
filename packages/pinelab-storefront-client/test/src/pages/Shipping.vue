<template>
  <Layout>
    <Shipping />
  </Layout>
</template>

<script>
import { Shipping } from 'pinelab-storefront-client/ministore';

export default {
  components: {
    Shipping,
  },
  created() {
    this.$context.previousPage = '/customer-details/';
    this.$context.checkoutProgress = 66;
    this.$context.hideCartIcon = true;
  },
};
</script>
