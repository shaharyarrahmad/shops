<template>
  <Layout #content>
    <CartOverview
      empty-cart-label="Je hebt nog geen producten in je winkelmand..."
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
