<template>
  <Layout>
    <CheckoutSteps
      previousPage="/cart/"
      :availableCountries="$context.availableCountries"
      customer-details-label="Adres gegevens"
      shipping-label="Verzending"
      payment-label="Betalen"
      succes-label="Besteld!"
      company-label="Bedrijfsnaam"
      firstname-label="Voornaam"
      lastname-label="Achternaam"
      phone-label="Telefoonnr."
      email-label="Emailadres"
      postal-code-label="Postcode"
      house-number-label="Huisnr."
      street-label="Straat"
      city-label="Plaats"
      country-label="Land"
      total-label="Totaal"
    />
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
