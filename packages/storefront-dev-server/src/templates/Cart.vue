<template>
  <Layout #content>
    <CartOverview
      empty-cart-label="No items in cart yet"
      link-to-checkout="/checkout/"
    />
  </Layout>
</template>
<script>
import CartOverview from 'pinelab-storefront-client/lib/buefy-components/CartOverview';
export default {
  components: {
    CartOverview,
  },
};
</script>
