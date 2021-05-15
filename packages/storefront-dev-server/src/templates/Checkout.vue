<template>
  <Layout #content>
    <CheckoutSteps previousPage="/cart/" />
  </Layout>
</template>
<script>
import CheckoutSteps from 'pinelab-storefront-client/lib/buefy-components/CheckoutSteps';

export default {
  components: {
    CheckoutSteps,
  },
};
</script>
