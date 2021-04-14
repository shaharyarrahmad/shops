<template>
  <div>
    <ShopNavBar
      logo="/img/bendeboef-logo.svg"
      logo-alt="Ben de Boef logo"
      cart-link="/cart/"
      :activeOrder="$store.activeOrder"
    >
      <g-link
        v-for="link of data.links"
        :to="link.url"
        :key="link.url"
        class="navbar-item"
      >
        {{ link.name }}
      </g-link>
    </ShopNavBar>

    <slot name="hero" />

    <div class="container is-widescreen section">
      <slot name="content" />
    </div>

  </div>
</template>
<script>
import ShopNavBar from "../components/ShopNavbar";

export default {
  components: {
    ShopNavBar
  },
  data: () => ({
    data: require(`../data/${process.env.GRIDSOME_SITE}.json`)
  })
};
</script>
