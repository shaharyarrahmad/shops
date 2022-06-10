<template>
  <DefaultLayout>
    <template #content>
      <CartOverview
        empty-cart-label="Je hebt nog geen producten toegevoegd..."
        link-to-checkout="/checkout/"
        total-label="Totaal"
        checkout-button-label="Bestellen"
        coupon-label="Kortingscode"
      />
    </template>
  </DefaultLayout>
</template>
<script>
import CartOverview from 'pinelab-storefront/lib/ui/organisms/CartOverview';

export default {
  components: {
    CartOverview,
  },
};
</script>
