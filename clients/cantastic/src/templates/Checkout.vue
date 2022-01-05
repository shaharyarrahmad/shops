<template>
  <DefaultLayout>
    <CheckoutSteps
      previousPage="/cart/"
      :availableCountries="$context.availableCountries"
    />
  </DefaultLayout>
</template>
<script>
import CheckoutSteps from 'pinelab-storefront-client/lib/buefy-components/CheckoutSteps';

export default {
  components: {
    CheckoutSteps,
  },
};
</script>
