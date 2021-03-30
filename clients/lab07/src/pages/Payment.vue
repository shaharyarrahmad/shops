<template>
  <Layout>
    <Payment />
  </Layout>
</template>

<script>
import { Payment } from 'pinelab-storefront-client/lib/ministore';

export default {
  components: {
    Payment,
  },
  created() {
    this.$context.previousPage = '/shipping/';
    this.$context.checkoutProgress = 95;
    this.$context.hideCartIcon = true;
  },
};
</script>
