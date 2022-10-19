<template>
  <nav
    role="navigation"
    aria-label="main navigation"
    class="navbar-expanded is-fixed-top sticky-top has-navbar-centered"
  >
    <div class="navbar-brand">
      <div id="banner" class="notification is-dark-green p-1 has-text-centered">
        <p class="mdi mdi-truck-outline has-text-white">
          Vanaf €50,- gratis verzenden binnen NL
        </p>
      </div>
      <div id="top-navbar" class="container is-widescreen section p-2">
        <div class="columns is-vcentered is-mobile is-centered">
          <div id="main-logo" class="column">
            <g-link to="/">
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
            <div>
              <b-button type="is-shadowless is-hovered">
                <i class="mdi mdi-cart-outline mdi-26px has-text-white"></i>
              </b-button>
              <span class="cart-badge">3</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NAVBAR VARIABLES -->

    <div class="navbar-menu">
      <div class="navbar-start">
        <div
          id="navbar-items-wrapper"
          class="container is-widescreen section is-hidden-mobile p-0"
        >
          <template v-for="collection in collections.slice(0, 4)">
            <template
              v-if="collection.children && collection.children.length > 0"
            >
              <!-- Collection with child collections -->
              <div class="navbar-item has-dropdown is-hoverable shadow">
                <g-link :to="collection.slug" class="navbar-link">
                  {{ collection.name }}
                </g-link>
                <div class="navbar-dropdown">
                  <div class="container section py-1">
                    <div class="columns has-text-left">
                      <div class="column">
                        <template
                          v-for="childCollection in collection.children"
                        >
                          <g-link to="/" class="navbar-item px-0">
                            {{ childCollection.name }}
                          </g-link>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <!-- Collection without child collections -->
              <div class="navbar-item is-hoverable shadow">
                <g-link :to="collection.slug" class="navbar-link is-arrowless">
                  {{ collection.name }}
                </g-link>
              </div>
            </template>
          </template>
          <!-- Overflow collections -->
          <div class="navbar-item has-dropdown is-hoverable shadow">
            <a class="navbar-link"> Meer </a>
            <div class="navbar-dropdown">
              <div class="container section py-1">
                <div class="columns has-text-left">
                  <div class="column">
                    <template v-for="collection in collections.slice(4, 20)">
                      <g-link to="/" class="navbar-item px-0">
                        {{ collection.name }}
                      </g-link>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable shadow">
            <a class="navbar-link"> Informatie </a>
            <div class="navbar-dropdown">
              <div class="container section py-1">
                <div class="columns has-text-left">
                  <div class="column">
                    <g-link to="/" class="navbar-item px-0">
                      Advies en informatie
                    </g-link>
                    <g-link to="/" class="navbar-item px-0"> FAQ </g-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="navbar-item is-hoverable shadow">
            <g-link to="/" class="navbar-link is-arrowless"> Contact </g-link>
          </div>
        </div>
      </div>
    </div>
    <div clas="navbar-end"></div>
  </nav>
</template>

<script>
export default {
  props: ['collections'],
  components: {},
};
</script>

<style></style>
