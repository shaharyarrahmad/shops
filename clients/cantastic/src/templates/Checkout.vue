<template>
  <DefaultLayout>
    <template #content>
      <CheckoutSteps
        previousPage="/cart/"
        :availableCountries="$context.availableCountries"
        total-label="Totaal"
        payment-method-label="Hoe wil je betalen?"
        succes-label="Naar de jaap!"
        payment-label="Betaling"
        shipping-label="Verzending"
        house-number-label="Huisnr."
        country-label="Land"
        street-label="Straat"
        postal-code-label="Postcode"
        email-label="Email"
        phone-label="Telefoonnr."
        lastname-label="Achternaam"
        firstname-label="Voornaam"
        company-label="Bedrijfsnaam"
        city-label="Plaats"
        :available-countries="[
          { name: 'Nederland', code: 'nl' },
          { name: 'Germany', code: 'de' },
          { name: 'België', code: 'be' },
        ]"
        cart-overview-label="Jouw bestelling"
        customer-details-label="Gegevens"
        previous-page="/"
      >
        <template #shipping>
          <div v-if="pickupPointSelected">JAWEL</div>
        </template>
      </CheckoutSteps>
    </template>
  </DefaultLayout>
</template>
<script>
import CheckoutSteps from 'pinelab-storefront-client/lib/buefy-components/CheckoutSteps';

export default {
  components: {
    CheckoutSteps,
  },
  computed: {
    pickupPointSelected() {
      return (
        this.$store.activeOrder?.shippingLines?.[0]?.shippingMethod?.code?.indexOf(
          'pickup-point'
        ) > -1
      );
    },
  },
};
</script>
