<template>
  <DefaultLayout>
    <template>
      <CheckoutSteps
        class="checkout-steps"
        :vendure="$vendure"
        :emitter="$emitter"
        :store="$store"
        :available-countries="$context.availableCountries"
      >
      </CheckoutSteps>
    </template>
  </DefaultLayout>
</template>
<script>
import CheckoutSteps from 'pinelab-storefront/lib/components/CheckoutSteps';

export default {
  components: {
    CheckoutSteps,
  },
};
</script>
<style>
.scrollable-product-overview {
  max-height: 300px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
