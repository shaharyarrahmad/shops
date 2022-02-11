<template>
  <div>
    <ShopNavBar
      logo="/img/cryptherion-logo-black.svg"
      logo-alt="Cryptherion logo"
      cart-link="/cart/"
      :activeOrder="activeOrder"
    >
      <!--      <g-link to="https://pinelab.studio/minishop/" class="navbar-item">
        Ik wil ook een minishop
      </g-link>-->
    </ShopNavBar>

    <div class="container is-widescreen section" style="min-height: 90vh">
      <b-button v-if="$context.back" tag="a" :href="$context.back">
        <
      </b-button>

      <br />

      <transition :name="$route.meta.transitionName" appear>
        <main>
          <slot />
        </main>
      </transition>
    </div>

    <footer v-if="showFooter" class="footer">
      <div class="content has-text-centered is-dark">
        Cryptherion.io •
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
  mounted() {
    console.log(this.$route);
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
