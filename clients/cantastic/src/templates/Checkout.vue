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
import CheckoutSteps from 'pinelab-storefront/lib/pages/CheckoutSteps';

export default {
  components: {
    CheckoutSteps,
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder || {};
    },
    hasShippingSelected() {
      return !!this.$store?.activeOrder?.shippingLines?.[0]?.shippingMethod?.id;
    },
  },
  data() {
    return {
      activeStep: 0,
      shippingMethods: [],
      loadingPayment: false,
    };
  },
  methods: {
    async gotToShipping() {
      this.activeStep = 1;
      this.shippingMethods = await this.$vendure.getEligibleShippingMethods();
    },
    async startPayment() {
      this.loadingPayment = true;
      try {
        await startPayment(this.$vendure, 'mollie');
      } finally {
        this.loadingPayment = false;
      }
    },
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
