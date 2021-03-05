<template>
  <Layout>
    <Shipping />
  </Layout>
</template>

<script>
import { Shipping } from 'shared-components';

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
