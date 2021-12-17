<template>
  <div>
    <ShopNavBar
      logo="/pinelab-logo.png"
      logo-alt="Pinelab logo"
      cart-link="/cart/"
      :activeOrder="activeOrder"
    >
      <g-link
        to="https://pinelab.studio/minishop/"
        class="navbar-item"
      >
        Ik wil ook een minishop
      </g-link>
    </ShopNavBar>

    <div class="container is-widescreen section" style="min-height: 90vh">
      <Breadcrumb v-if="$context.breadcrumb" :crumbs="$context.breadcrumb" />

      <br />

      <slot />
    </div>

    <footer v-if="showFooter" class="footer">
      <div class="content has-text-centered is-dark">
        Minishop demo •
        <a href="https://pinelab.studio/" target="_blank">Made by Pinelab 🌲</a>
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
