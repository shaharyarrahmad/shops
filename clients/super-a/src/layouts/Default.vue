<template>
  <div>
    <ShopNavBar
      logo="/img/logo.png"
      logo-alt="Super A"
      cart-link="/cart/"
      :activeOrder="activeOrder"
      cartIcon="cart"
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
        • Super A
        • <a href="https://pinelab.studio/" target="_blank">Made by Pinelab 🌲</a>
        • <a :href="`mailto:${$context.data.email}`" target="_blank">{{ $context.data.email }}</a>
      </div>
    </footer>
  </div>
</template>
<script>
import ShopNavBar from 'pinelab-storefront-client/lib/buefy-components/ShopNavbar';
import Breadcrumb from 'pinelab-storefront-client/lib/buefy-components/Breadcrumb';

export default {
  props: {
    showFooter: {
      default: true,
    },
  },
  components: {
    ShopNavBar,
    Breadcrumb,
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
