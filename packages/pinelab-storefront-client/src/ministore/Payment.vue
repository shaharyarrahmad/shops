<template>
  <div>
    <p>Je wordt doorgestuurd naar het betaal platform...</p>
    <ClientOnly>
      <p v-if="error" v-html="error"></p>
    </ClientOnly>
  </div>
</template>
<script>
export default {
  mixins: [require('./empty-basket-validator')],
  data() {
    return {
      error: undefined,
    };
  },
  async mounted() {
    try {
      const redirectUrl = await this.$vendure.createMolliePaymentIntent(
        `mollie-payment-${process.env.GRIDSOME_VENDURE_TOKEN}`
      );
      window.location.replace(redirectUrl);
    } catch (e) {
      this.error = e.message;
      throw e;
    }
  },
};
</script>
