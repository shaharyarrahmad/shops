<template>
  <div>
    <ShopNavBar
      logo="/img/bendeboef-logo.svg"
      logo-alt="Ben de Boef logo"
      cart-link="/cart/"
      :activeOrder="activeOrder"
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

      <section id="breadcrumb">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li v-for="(url, name) of $context.breadcrumb" :key="url">
              <g-link :to="url">{{ name }}</g-link>
            </li>
          </ul>
        </nav>
      </section>
      <br>

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
  computed: {
    activeOrder(){
      return this.$store?.activeOrder;
    }
  },
  mounted() {
  },
  data() {
    return {
      data: require(`../data/${process.env.GRIDSOME_SITE}.json`)
    }
  }
};
</script>
