<template>
  <Layout>
    <CustomerDetails />
  </Layout>
</template>
<script>
import { CustomerDetails } from 'pinelab-storefront-client/lib/ministore';

export default {
  components: {
    CustomerDetails,
  },
  created() {
    this.$context.previousPage = '/cart/';
    this.$context.checkoutProgress = 33;
    this.$context.hideCartIcon = true;
  },
};
</script>
