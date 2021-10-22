<template>
  <Layout #content>
    <OrderConfirmation v-on:order-confirmed="track($event)"/>
  </Layout>
</template>
<script>
import OrderConfirmation from 'pinelab-storefront-client/lib/buefy-components/OrderConfirmation';

export default {
  components: {
    OrderConfirmation,
  },
  methods: {
    track(event) {
      console.log(event);
      const purchase = {
        "transaction_id": event.orderId,
        "affiliation": "Pinelab demo shop",
        "value": event.value / 100
      };
      console.log(purchase);
      this.$gtag.purchase(purchase)
    }
  }
};
</script>
