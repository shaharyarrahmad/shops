<template>
  <b-navbar fixed-top class="shop-bar">
    <template #brand>
      <b-navbar-item tag="div" class="is-hidden-desktop">
        <g-link :to="cartLink" class="button is-primary">
            <span class="icon is-small">
              <i :class="`mdi mdi-${ cartIcon }`"></i>
            </span>
          <span>
          {{ nrOfItems }}
            </span>
        </g-link>
      </b-navbar-item>

      <b-navbar-item tag="a" :to="{ path: '/' }">
        <img
          :src="logo"
          :alt="logoAlt"
          class="shop-logo"
        />
      </b-navbar-item>
    </template>
    <template #start>
      <slot />
    </template>
    <template #end>
      <b-navbar-item tag="div" class="is-hidden-touch">
        <b-tooltip :label="price" position="is-bottom">
          <g-link :to="cartLink" class="button is-primary">
            <span class="icon is-small">
              <i :class="`mdi mdi-${ cartIcon }`"></i>
            </span>
            <span>
          {{ nrOfItems }}
            </span>
          </g-link>
        </b-tooltip>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>

export default {
  computed: {
    nrOfItems() {
      if (this.$store?.activeOrder?.lines?.length === 0) {
        return 0;
      }
      return (
        this.$store?.activeOrder?.lines
          ?.map((l) => l.quantity)
          ?.reduce((quantity1, quantity2) => quantity1 + quantity2) || 0
      );
    },
    price() {
      return this.$root.$options.filters.euro(this.activeOrder?.totalWithTax);
    }
  },
  props: {
    activeOrder: {
      required: true
    },
    cartLink: {
      type: String,
      required: true
    },
    cartIcon: {
      type: String,
      default: "shopping"
    },
    logo: {
      type: String,
      required: true
    },
    logoAlt: {
      type: String,
      required: true
    }
  }
};
</script>
<style>
.shop-logo {
  max-width: 200px;
}
</style>
