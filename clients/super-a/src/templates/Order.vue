<template>
  <Layout #content>
    <OrderConfirmation>
<!--      <Newsletter />
      <br />-->
      <video playsinline autoplay muted loop>
        <source src="/video/shipping.mp4" type="video/mp4" />
      </video>
    </OrderConfirmation>
  </Layout>
</template>
<script>
import OrderConfirmation from 'pinelab-storefront-client/lib/buefy-components/OrderConfirmation';
import Newsletter from '../components/Newsletter';

export default {
  components: {
    Newsletter,
    OrderConfirmation
  }
};
</script>
