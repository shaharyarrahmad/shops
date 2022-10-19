<template>
  <b-navbar type="" centered transparent class="is-fixed-top">
    <template #brand>
      <!--      <div id="banner" class="notification is-dark-green p-1 has-text-centered">
              <p class="mdi mdi-truck-outline has-text-white">
                Vanaf €50,- gratis verzenden binnen NL
              </p>
            </div>-->
      <div class="container is-widescreen section" id="top-navbar">
        <div class="columns is-mobile pt-2" style="width: 100%">
          <div class="column">
            <g-link to="/" aria-current="page">
              <img
                src="/img/logo-wormenkwekerijwasse.png"
                width="120px"
                id="logo"
              />
            </g-link>
          </div>
          <div id="search" class="column is-hidden-mobile">
            <b-field position="is-centered">
              <b-input placeholder="Zoek producten..." type="search"> </b-input>
              <p class="control">
                <b-button type="is-shadowless is-hovered">
                  <i class="mdi mdi-magnify mdi-26px has-text-white"></i>
                </b-button>
              </p>
            </b-field>
          </div>
          <div class="column has-text-right" id="icons">
            <span class="icon is-medium is-hidden-tablet is-clickable">
              <i
                class="mdi mdi-magnify mdi-36px"
                @click="isSearchModalActive = true"
                style="z-index: 999"
              >
              </i>
            </span>
            <Basket
              :vendure="$vendure"
              :store="$store"
              :emitter="$emitter"
              cartUrl="/winkelmand/"
              @cart-button-clicked="
                $router.push('/winkelmand/').catch((e) => {})
              "
              @checkout-button-clicked="
                $router.push('/checkout/').catch((e) => {})
              "
            >
              <i class="mdi mdi-basket mdi-36px has-text-white"></i>
            </Basket>
          </div>
        </div>
      </div>
    </template>
    <template #start>
      <!--------------- Desktop menu -------------------------->
      <div
        class="container is-widescreen section is-hidden-mobile"
        id="navbar-items-wrapper"
      >
        <!-------------------- Single collection ------------------>
        <g-link
          class="navbar-item is-uppercase navbar-link is-arrowless is-family-secondary"
          to="/"
        >
          TEST
        </g-link>
      </div>

      <!------------ Mobile menu ------------->
      <div
        class="container is-widescreen section py-2 is-hidden-desktop"
        id="mobile-navigation"
      >
        <template v-for="collection of $context.collections">
          <g-link
            class="is-uppercase is-family-secondary is-block pb-2"
            :to="`/categorie/${collection.slug}`"
          >
            <b>{{ collection.name }}</b>
          </g-link>
          <g-link
            v-for="subCollection of collection.children"
            :key="subCollection.slug"
            class="pl-3 pb-2 is-block"
            :to="`/categorie/${subCollection.slug}`"
          >
            {{ subCollection.name }}
          </g-link>
        </template>
      </div>
    </template>
  </b-navbar>
</template>

<script>
import Basket from 'pinelab-storefront/lib/components/Basket';

export default {
  props: ['collections'],
  components: { Basket },
};
</script>
<style>
.navbar-brand {
  width: 100%;
}

.navbar {
  flex-wrap: wrap;
}

.navbar-burger {
  margin-top: 6px !important;
}

.navbar-start {
  width: 100%;
}
</style>
