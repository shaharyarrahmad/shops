<template>
  <div>
    <ShopNavBar
      logo="/img/cryptherion-logo-black.svg"
      logo-alt="Cryptherion logo"
      cart-link="/cart/"
      cart-icon="basket"
      :activeOrder="activeOrder"
    >
      <template v-for="collection of $context.collections">
        <!-- collections with children-->
        <div
          v-if="collection.children"
          class="navbar-item has-dropdown is-hoverable"
        >
          <g-link class="navbar-item" :to="`/categorie/${collection.slug}`">
            {{ collection.name }}
          </g-link>
          <div class="navbar-dropdown">
            <g-link
              v-for="subCollection of collection.children"
              :key="subCollection.slug"
              class="navbar-item"
              :to="`/categorie/${subCollection.slug}`"
            >
              {{ subCollection.name }}
            </g-link>
          </div>
        </div>
        <!-- flat no-children collections -->
        <g-link
          v-else
          :to="`/categorie/${collection.slug}`"
          :key="collection.slug"
          class="navbar-item"
        >
          {{ collection.name }}
        </g-link>
      </template>
    </ShopNavBar>

    <div class="container is-widescreen section" style="min-height: 90vh">
      <b-button v-if="$context.back" tag="a" :href="$context.back">
        <
      </b-button>

      <br />

      <Breadcrumb v-if="$context.breadcrumb" :crumbs="$context.breadcrumb" />

      <transition :name="$route.meta.transitionName" appear>
        <main>
          <slot />
        </main>
      </transition>
    </div>

    <footer v-if="showFooter" class="footer">
      <div class="columns has-text-centered">
        <div class="column">
          <h4>Assortiment</h4>
          <g-link
            v-for="collection of $context.collections"
            :to="`/categorie/${collection.slug}`"
            :key="collection.slug"
          >
            {{ collection.name }}<br />
          </g-link>
        </div>
        <div class="column">
          <h4>Contact</h4>
          <p>telefoonnummer:</p>
          <p>info@cryptherion.io</p>
        </div>
      </div>
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

.product-card-container > p {
  font-size: 1.5rem;
  font-style: italic;
}

.navbar {
  border-bottom: 1px solid #e1e1e1;
}
</style>
