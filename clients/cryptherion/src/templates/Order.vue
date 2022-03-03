<template>
  <Layout>
    <OrderConfirmation
      message="Gefeliciteerd met je bestelling! Je hebt een bevestiging in de mail gekregen."
      item-label="Product"
      quantity-label="Aantal"
      total-label="Totaal"
      customer-details-label="Adres gegevens"
      shipping-label="Verzending"
      payment-label="Betalen"
      succes-label="Besteld!"
      tax-label="BTW"
    />
  </Layout>
</template>
<script>
import OrderConfirmation from 'pinelab-storefront-client/lib/buefy-components/OrderConfirmation';

export default {
  components: {
    OrderConfirmation,
  },
};
</script>
