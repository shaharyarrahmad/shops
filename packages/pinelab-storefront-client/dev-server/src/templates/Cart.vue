<template>
  <Layout #content>
    <CartOverview
      empty-cart-text="No items in cart yet"
      link-to-checkout="/checkout/"
      checkout-button-text="Order now"
    />
  </Layout>
</template>
<script>
import CartOverview from '../../../lib/buefy-components/CartOverview';
export default {
  components: {
    CartOverview
  }
};
</script>