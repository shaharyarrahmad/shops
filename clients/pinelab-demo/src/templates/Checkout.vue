<template>
  <Layout #content>
    <CheckoutSteps
      previousPage="/cart/"
      customerDetailsLabel="Gegevens"
      shippingLabel="Verzending"
      paymentLabel="Betaling"
      companyLabel="Bedrijfsnaam"
      firstnameLabel="Voornaam"
      lastnameLabel="Achternaam"
      phoneLabel="Telefoonnr."
      emailLabel="Email"
      cityLabel="Plaats"
      postalCodeLabel="Postcode"
      streetLabel="Straatnaam"
      houseNumberLabel="Huisnr."
      countryLabel="Land"
      totalLabel="Totaal"
      succesLabel="Succes!"
      :availableCountries="$context.availableCountries"
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
