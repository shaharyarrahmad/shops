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
    >
      <template #failed>
        <b-notification type="is-info" aria-close-label="Close notification">
          Je bestelling wordt verwerkt.

          <br />
          <br />
          Heb je met crypto betaald? Dan kan het even duren voordat je
          transactie is bevestigd. Je krijg een bevestigingsmail wanneer de
          transactie is verwerkt.
        </b-notification>
      </template>
    </OrderConfirmation>
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
