<template>
  <div>
    <ShopNavBar
      logo="/img/bendeboef-logo.svg"
      logo-alt="Ben de Boef logo"
      cart-items="2"
      cart-link="/cart/"
      cart-price="€35,15"
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

    <slot />

  </div>
</template>
<script>
import ShopNavBar from '../components/ShopNavbar'

export default {
  components: {
    ShopNavBar
  },
  data: () => ({
    data: require(`../data/${process.env.GRIDSOME_SITE}.json`)
  }),
};
</script>
