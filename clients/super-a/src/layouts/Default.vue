<template>
  <div>
    <Consent
      accept-text="Accept"
      decline-text="No"
      thank-you-message="Thanks!"
      v-on:approved="activateAnalytics()"
    >
      We send anonymized data to Google Analytics to improve our site. Are you
      oke with that?
      <br />
      <a href="/terms-conditions-and-privacy-policy/" target="_blank"
        >Read our policy</a
      >
    </Consent>

    <ShopNavBar
      logo="/img/logo_small.png"
      logo-alt="Super A"
      cart-link="/cart/"
      :activeOrder="activeOrder"
      cartIcon="cart"
    >
      <g-link
        v-for="link of links"
        :to="link.url"
        :key="link.url"
        class="navbar-item"
      >
        {{ link.name }}
      </g-link>
    </ShopNavBar>

    <slot name="hero" />

    <div class="container is-widescreen section" style="min-height: 90vh">
      <Breadcrumb v-if="$context.breadcrumb" :crumbs="$context.breadcrumb" />

      <br />

      <slot name="content" />
    </div>

    <footer v-if="showFooter" class="footer main-footer">
      <div class="content has-text-centered is-dark">
        <Newsletter />

        <br />

        <a :href="$context.global.instagram" target="_blank">
          <b-icon icon="instagram"></b-icon>
        </a>
        <br />
        <br />
        Super A •
        <a
          :href="`mailto:${$context.global.email_adressen[0]}`"
          target="_blank"
          >{{ $context.global.email_adressen[0] }}</a
        >
        •
        <a class="has-text-grey" href="https://pinelab.studio/" target="_blank"
          >Made by Pinelab 🌲</a
        >
        <br />
        <br />
        <a
          class="has-text-grey"
          href="/terms-conditions-and-privacy-policy/"
          target="_blank"
        >
          Terms, conditions and privacy policy
        </a>
      </div>
    </footer>
  </div>
</template>
<script>
import ShopNavBar from 'pinelab-storefront-client/lib/buefy-components/ShopNavbar';
import Breadcrumb from 'pinelab-storefront-client/lib/buefy-components/Breadcrumb';
import Newsletter from '../components/Newsletter';
import Consent from '../templates/Consent';
import { bootstrap } from 'vue-gtag';

export default {
  props: {
    showFooter: {
      default: true,
    },
  },
  components: {
    ShopNavBar,
    Breadcrumb,
    Consent,
    Newsletter,
  },
  data() {
    return {
      links: [
        {
          name: 'Shop',
          url: '/shop/',
        },
        {
          name: 'Portfolio',
          url: '/portfolio/',
        },
        {
          name: 'Bio',
          url: '/bio/',
        },
        {
          name: 'Contact',
          url: '/contact/',
        },
      ],
    };
  },
  metaInfo() {
    const desc =
      "Stefan Thelen's anti-superhero identity - Super A is a Dutch artist who uses traditional painting technique and a knack for design to create compositions that manipulate familiar iconography into mind-bending and inquisitive pieces.";
    return {
      title: this.$context.global.title,
      meta: [
        { name: 'description', content: desc },
        { name: 'og:title', content: this.$context.global.title },
        { name: 'og:description', content: desc },
        {
          name: 'og:image',
          content: 'https://supera.netlify.app/img/hero.jpg',
        },
      ],
    };
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder;
    },
  },
  methods: {
    async activateAnalytics() {
      await bootstrap();
      console.log('ga approved');
    },
  },
  mounted() {},
};
</script>
<style>
.main-footer a {
  color: white;
}
.main-footer a:hover {
  color: white;
}
/* Consent cancel greyed */
body > div.notices.is-bottom > div > div.action.is-light.is-cancel > button {
  color: #5f5f5f;
}
.shop-logo {
  margin-right: 20px;
}
</style>
