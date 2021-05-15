<template>
  <Layout #content>
    <OrderConfirmation />
  </Layout>
</template>
<script>
import OrderConfirmation from 'pinelab-storefront-client/lib/buefy-components/OrderConfirmation';

export default {
  components: {
    OrderConfirmation,
  },
};
</script>
