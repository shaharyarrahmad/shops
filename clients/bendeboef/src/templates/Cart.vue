<template>
  <Layout #content showFooter="false">
    <CartOverview
      empty-cart-text="No items in cart yet"
      link-to-checkout="/checkout/"
      checkout-button-text="Order now"
    />
  </Layout>
</template>
<script>
export default {
};
</script>