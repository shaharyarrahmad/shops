<template>
  <DefaultLayout>
    <template #content>
      <CartOverview
        empty-cart-label="No products yet..."
        link-to-checkout="/checkout/"
      />
    </template>
  </DefaultLayout>
</template>
<script>
import CartOverview from 'pinelab-storefront-client/lib/buefy-components/CartOverview';

export default {
  components: {
    CartOverview,
  },
};
</script>
