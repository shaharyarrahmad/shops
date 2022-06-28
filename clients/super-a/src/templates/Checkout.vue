<template>
  <Layout #content>
    <CheckoutSteps
      :vendure="$vendure"
      :store="$store"
      :available-countries="$context.availableCountries"
    >
    </CheckoutSteps>
  </Layout>
</template>
<script>
import CheckoutSteps from 'pinelab-storefront/lib/components/CheckoutSteps';

export default {
  components: {
    CheckoutSteps,
  },
};
</script>
