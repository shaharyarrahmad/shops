<template>
  <Layout>
    <CartOverview
      empty-cart-label="No products yet..."
      link-to-checkout="/cart/checkout/"
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
