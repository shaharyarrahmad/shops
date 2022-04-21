<template>
  <DefaultLayout>
    <template #content>
      <CheckoutSteps
        previousPage="/cart/"
        :availableCountries="$context.availableCountries"
      />
    </template>
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
