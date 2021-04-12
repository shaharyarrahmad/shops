<template>
  <b-navbar fixed-top class="shop-bar">
    <template #brand>
      <b-navbar-item tag="div" class="is-hidden-desktop">
        <b-tooltip :label="cartPrice" position="is-bottom">
          <g-link to="/cart/" class="button is-primary">
            <span class="icon is-small">
              <i :class="`mdi mdi-${ cartIcon }`"></i>
            </span>
            <span>
          {{ cartItems }}
            </span>
          </g-link>
        </b-tooltip>
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
        <b-tooltip :label="cartPrice" position="is-bottom">
          <g-link to="/cart/" class="button is-primary">
            <span class="icon is-small">
              <i :class="`mdi mdi-${ cartIcon }`"></i>
            </span>
            <span>
          {{ cartItems }}
            </span>
          </g-link>
        </b-tooltip>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
export default {
  props: {
    cartPrice: {
      type: String,
      required: true
    },
    cartLink: {
      type: String,
      required: true
    },
    cartItems: {
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
