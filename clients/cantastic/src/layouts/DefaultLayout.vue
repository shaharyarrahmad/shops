<template>
  <div>
    <ShopNavBar
      logo="/cantastic_logo.png"
      logo-alt="Pinelab logo"
      cart-link="/cart/"
      :activeOrder="activeOrder"
    >
      <g-link to="https://pinelab.studio/minishop/" class="navbar-item">
        Cans
      </g-link>
      <g-link to="https://pinelab.studio/minishop/" class="navbar-item">
        Caps
      </g-link>
      <g-link to="https://pinelab.studio/minishop/" class="navbar-item">
        Markers
      </g-link>
    </ShopNavBar>

    <div class="container is-widescreen section" style="min-height: 90vh">

      <b-button v-if="$context.showBack" tag="a" @click="$router.go(-1)">
        <
      </b-button>

      <br />

      <slot />
    </div>

    <footer class="footer">
      <div class="content has-text-centered is-dark">
        Cantastic •
        <a href="https://pinelab.studio/" target="_blank">Made by Pinelab 🌲</a>
      </div>
    </footer>
  </div>
</template>
<script>
import ShopNavBar from 'pinelab-storefront-client/lib/buefy-components/ShopNavbar';
import Breadcrumb from 'pinelab-storefront-client/lib/buefy-components/Breadcrumb';

export default {
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
