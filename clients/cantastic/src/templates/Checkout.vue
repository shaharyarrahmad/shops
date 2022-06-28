<template>
  <DefaultLayout>
    <template #content>
      <CheckoutSteps
        :vendure="$vendure"
        :store="$store"
        :available-countries="[
          { name: 'Nederland', code: 'nl' },
          { name: 'België', code: 'be' },
          { name: 'Duitsland', code: 'de' },
        ]"
      >
        <template #orderSummaryFooter>
          <h5>Betaalmogelijkheden</h5>
          <img src="/img/payments.png" alt="Betaalmogelijkheden" />
        </template>
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
