<template>
  <Layout>
    <div style="min-height: 50vh">
      <OrderConfirmation
        message="Wat leuk dat je het boek “Op!” hebt gekocht!"
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
            Er is helaas iets mis gegaan. Neem contact op met
            <ClickableEmail />
          </b-notification>
        </template>
      </OrderConfirmation>
    </div>
  </Layout>
</template>
<script>
import OrderConfirmation from 'pinelab-storefront-client/lib/buefy-components/OrderConfirmation';

export default {
  components: { OrderConfirmation },
};
</script>
<style>
table {
  background-color: transparent !important;
}
</style>
