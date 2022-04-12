<template>
  <div>
    <div class="container section mt-20 pt-0">
      <div class="has-text-centered">
        <h1 class="has-text-primary mt-0">OP!</h1>
      </div>
      <slot />
    </div>

    <footer class="footer pb-4">
      <div class="container section pb-0">
        <div class="columns">
          <div id="contact" class="column">
            <h2>Contact</h2>
            <a href="mailto:jetvannieuwkerk@gmail.com"
              >jetvannieuwkerk@gmail.com</a
            >
            <br />
          </div>
          <div class="column">
            <h2>OP!</h2>
            <a href="#about">Over het boek</a> <br />
            <a href="#about">Over Jet</a> <br />
            <a href="#faq">FAQ</a> <br />
          </div>
          <div class="column">
            <a href="#about">Instagram?</a> <br />
            <a href="#about">facebook?</a> <br />
            <br />
            <b-button class="is-primary" tag="a" href="#buy"
              >Koop het e-boek voor
              <b>{{ $context.product.lowestPrice | euro }}</b>
            </b-button>
            <br />
            <br />
            <img
              src="/img/mollie-dark.png"
              alt="Veilig betalen met Mollie"
              style="height: 60px; opacity: 0.6"
            />
          </div>
        </div>

        <br />
        <br />
        <br />
        <div class="content has-text-centered is-dark has-text-grey-light">
          OP! • Jet van Nieuwkerk •
          <a
            href="https://pinelab.studio/"
            target="_blank"
            class="has-text-grey-light"
            >Website door Pinelab</a
          >
        </div>
      </div>
    </footer>

    <Consent
      accept-text="Ja, dat is goed"
      decline-text="Nee"
      thank-you-message="Bedankt!"
      v-on:approved="activateAnalytics()"
    >
      <br />
      <h4>Cookies</h4>
      Vind je het goed dat we geanonimiseerde data naar Google Analytics sturen,
      om het gebruik van de website te meten?
      <br />
    </Consent>
  </div>
</template>
<script>
import { bootstrap } from 'vue-gtag';
import Consent from 'pinelab-storefront-client/lib/buefy-components/Consent';

export default {
  components: {
    Consent,
  },
  methods: {
    async activateAnalytics() {
      await bootstrap();
      console.log('ga approved');
    },
  },
  metaInfo() {
    return {
      title: 'Op!',
      meta: [{ name: 'description', content: 'Op! - Het boek' }],
    };
  },
};
</script>
<style></style>
