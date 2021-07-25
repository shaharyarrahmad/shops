<template>
  <div>
    <ShopNavBar
      logo="/img/bendeboef-logo.svg"
      logo-alt="Ben de Boef logo"
      cart-link="/cart/"
      :activeOrder="activeOrder"
    >
      <g-link
        v-for="link of $context.data.links"
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

    <footer v-if="showFooter" class="footer">
      <div class="content has-text-centered is-dark">
        <a :href="$context.data.instagram" target="_blank">
          <b-icon icon="instagram"></b-icon>
        </a>
        • Ben de Boef Tattoo's •
        <a href="https://pinelab.studio/" target="_blank"
          >Made with ❤ by Pinelab</a
        >
      </div>
    </footer>
  </div>
</template>
<script>
import ShopNavBar from 'pinelab-storefront-client/lib/buefy-components/ShopNavbar';

export default {
  props: {
    showFooter: {
      default: true,
    },
  },
  components: {
    ShopNavBar,
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder;
    },
  },
  mounted() {},
};
</script>
<style>
.footer a {
  color: white;
}
.footer a:hover {
  color: white;
}
</style>
