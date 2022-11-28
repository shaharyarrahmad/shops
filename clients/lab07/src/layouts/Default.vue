<template>
  <div>
    <template id="navbar">
      <b-navbar shadow>
        <template #brand>
          <b-navbar-item id="logo" tag="router-link" :to="{ path: '/' }">
            <img src="/logo.svg" />
          </b-navbar-item>
        </template>
        <template #end>
          <g-link class="mx-3 navbar-item" to="/shop/">SHOP</g-link>
          <g-link class="mx-3 navbar-item" to="/over-ons/">OVER ONS</g-link>
          <g-link class="mx-3 navbar-item" to="/contact/">CONTACT</g-link>
          <Basket
            :vendure="$vendure"
            :store="$store"
            :emitter="$emitter"
            cartUrl="/winkelmand/"
            @cart-button-clicked="$router.push('/winkelmand/').catch((e) => {})"
            @checkout-button-clicked="
              $router.push('/checkout/').catch((e) => {})
            "
          >
            <template #simple="{ nrOfItems, open }">
              <a class="mx-3 navbar-item" @click="open()"
                >WINKELMAND ({{ nrOfItems }})</a
              >
            </template>
          </Basket>
        </template>
      </b-navbar>
    </template>

    <div class="container is-widescreen section" style="min-height: 90vh">
      <Breadcrumb v-if="$context.breadcrumb" :crumbs="$context.breadcrumb" />

      <br />

      <slot />
    </div>

    <Consent
      accept-text="Ja hoor"
      decline-text="Nee"
      thank-you-message="Bedankt!"
      v-on:approved="activateAnalytics()"
    >
      <br />
      We sturen geanonimiseerde gegevens naar Google analytics om het gebruik
      van onze site te meten, vind je dat goed?
      <br />
      <a href="/privacy.pdf" target="_blank">Lees onze privacy policy</a>
    </Consent>
  </div>
</template>

<script>
import { bootstrap } from 'vue-gtag';
import Consent from 'pinelab-storefront/lib/components/Consent';
import Breadcrumb from 'pinelab-storefront/lib/components/Breadcrumb';
import Basket from 'pinelab-storefront/lib/components/Basket';

export default {
  components: { Consent, Breadcrumb, Basket },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder;
    },
    nrOfItems() {
      if (this.activeOrder?.lines?.length === 0) {
        return 0;
      }
      return (
        this.activeOrder?.lines
          ?.map((l) => l.quantity)
          ?.reduce((quantity1, quantity2) => quantity1 + quantity2) || 0
      );
    },
  },
  methods: {
    async activateAnalytics() {
      await bootstrap();
      console.log('ga approved');
    },
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
  },
};
</script>
<style>
@media only screen and (max-width: 1023px) {
  .navbar-item,
  .navbar-link {
    display: inline !important;
  }
}

@media only screen and (max-width: 600px) {
  .navbar-item,
  .navbar-link {
    display: table !important;
  }
}

a.navbar-item {
  color: var(--text);
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  height: 20px;
}

a.navbar-item:hover {
  text-decoration: underline;
}
</style>
