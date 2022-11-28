<template>
  <div>
    <template id="navbar">
      <b-navbar shadow class="is-fixed-top">
        <template #brand>
          <b-navbar-item id="logo" tag="router-link" :to="{ path: '/' }">
            <img src="/logo.svg" />
          </b-navbar-item>
        </template>
        <template #end>
          <g-link class="mx-3 navbar-item" to="/shop/">SHOP</g-link>
          <g-link class="mx-3 navbar-item" to="/over-ons/">OVER ONS</g-link>
          <g-link class="mx-3 navbar-item" to="/contact/">CONTACT</g-link>
          <g-link class="mx-3 navbar-item" to="/winkelmand/"
            >WINKELMAND ( 1 )</g-link
          >
        </template>
      </b-navbar>
    </template>

    <div style="padding-top: 100px">
      <template v-if="$slots.container">
        <div class="container is-widescreen section" style="min-height: 90vh">
          <Breadcrumb
            v-if="$context.breadcrumb"
            :crumbs="$context.breadcrumb"
          />

          <br />

          <slot name="container" />
        </div>
      </template>

      <slot name="fullwidth" />
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

    <footer class="footer">
      <div class="content has-text-centered">
        <g-link to="https://www.instagram.com/lab_____07/" target="_blank">
          <span class="icon is-small">
            <i class="mdi mdi-instagram"> </i>
          </span>
        </g-link>
        • LAB07 • KVK 01177713 •
        <g-link to="mailto:info@saskiawagenvoortartwork.nl" target="_blank"
          >info@saskiawagenvoortartwork.nl</g-link
        >
        •
        <g-link to="/privacy.pdf" target="_blank">privacy</g-link>
        •
        <g-link to="/voorwaarden.pdf" target="_blank"
          >algemene voorwaarden en levering</g-link
        >
        •
        <g-link to="https://pinelab.studio/" target="_blank"
          >Made with ❤ by pinelab</g-link
        >
      </div>
    </footer>
  </div>
</template>

<script>
import { bootstrap } from 'vue-gtag';
import Consent from 'pinelab-storefront/lib/components/Consent';
import Breadcrumb from 'pinelab-storefront/lib/components/Breadcrumb';

export default {
  components: { Consent, Breadcrumb },
  methods: {
    async activateAnalytics() {
      await bootstrap();
      console.log('ga approved');
    },
  },
};
</script>
<style>
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

footer {
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  z-index: 30;
}

a.navbar-item:hover {
  text-decoration: underline;
}

.icon {
  display: inline !important;
}

.navbar-item {
  height: 100%;
}
</style>
