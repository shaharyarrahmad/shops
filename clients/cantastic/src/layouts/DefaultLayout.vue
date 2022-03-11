<template>
  <div>
    <b-navbar :fixed-top="true" type="is-danger" centered transparent>
      <template #brand>
        <div class="container is-widescreen section" id="top-navbar">
          <div class="columns is-mobile pt-2" style="width: 100%">
            <div class="column">
              <a href="/" aria-current="page"
                ><img src="/logo.png" alt="Cantastic.nl logo" id="logo"
              /></a>
            </div>
            <div class="column is-hidden-mobile" id="search">
              <b-field type="is-">
                <b-autocomplete
                  :data="['Loop', 'Montana', '400ml']"
                  icon="magnify"
                  clearable
                  @select="(option) => (selected = option)"
                >
                  <template #empty>Geen resultaten gevonden</template>
                </b-autocomplete>
              </b-field>
            </div>
            <div class="column has-text-right" id="basket">
              <span class="is-hidden-tablet"
                ><b-icon icon="magnify" size="is-medium"></b-icon
              ></span>
              <span class="is-hidden-mobile"
                ><b-icon icon="whatsapp" size="is-medium"></b-icon
              ></span>
              <span>
                <b-icon icon="basket" size="is-medium"></b-icon>
                <span class="cart-badge">3</span>
              </span>
            </div>
          </div>
        </div>
      </template>
      <template #start>
        <b-navbar-dropdown label="Spraypaint" arrowless hoverable>
          <div class="columns is-centered my-3">
            <div class="column is-3">
              <h5 class="navbar-item">Spraypaint</h5>
              <g-link to="/" class="navbar-item sub">Loop Colors 400 ml</g-link>
              <g-link to="/" class="navbar-item sub">Loop Colors 600 ml</g-link>
              <g-link to="/" class="navbar-item sub"
                >Montana Black 400ml</g-link
              >
              <g-link to="/" class="navbar-item sub">Montana Ultrawide</g-link>
              <g-link to="/" class="navbar-item sub"
                >Burner Chrome & Tar</g-link
              >
              <g-link to="/" class="navbar-item sub"
                >Lak en primer spuitbus</g-link
              >
              <g-link to="/" class="navbar-item sub"
                >Water based Spray paint</g-link
              >
              <g-link to="/" class="navbar-item sub"
                >Speciaal Effect Spuitverf</g-link
              >
              <g-link to="/" class="navbar-item sub">Cleaner & Eraser</g-link>
              <g-link to="/" class="navbar-item sub">Voordeelpakketten</g-link>
            </div>
            <div class="column is-3">
              <h5 class="navbar-item">Caps</h5>
              <g-link to="/" class="navbar-item sub">Skinny Caps</g-link>
              <g-link to="/" class="navbar-item sub">Soft caps</g-link>
              <g-link to="/" class="navbar-item sub">Fat caps</g-link>
              <g-link to="/" class="navbar-item sub">Speciale caps</g-link>
              <g-link to="/" class="navbar-item sub">Pistol Grip</g-link>
              <g-link to="/" class="navbar-item sub">Mix zakken</g-link>
              <g-link to="/" class="navbar-item sub">Voordeel zakken</g-link>
            </div>
          </div>
        </b-navbar-dropdown>
        <b-navbar-item href="#"> markers</b-navbar-item>
        <b-navbar-item href="#"> uitrusting</b-navbar-item>
        <b-navbar-item href="#"> tekenen</b-navbar-item>
        <b-navbar-item href="#"> stickers</b-navbar-item>
        <b-navbar-item href="#"> kleding</b-navbar-item>
        <b-navbar-dropdown label="Boeken & magazines" arrowless hoverable>
          <div class="columns is-centered is-centered my-3">
            <div class="column is-3">
              <h5 class="navbar-item">Boeken & magazines</h5>
              <g-link to="/" class="navbar-item sub">Magazines</g-link>
              <g-link to="/" class="navbar-item sub">Boeken</g-link>
            </div>
          </div>
        </b-navbar-dropdown>
        <b-navbar-item href="#"> prints</b-navbar-item>
        <b-navbar-item href="#"> deals</b-navbar-item>
        <b-navbar-item href="#"> merken</b-navbar-item>
      </template>
    </b-navbar>

    <div id="main-content" class="container is-widescreen section">
      <br />

      <slot />
    </div>
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
  methods: {
    hasSubSubCollection(collection) {
      // Check if any of the subCollections has another Subcollection
      return collection.subCollection.find(
        (sub) => sub.subCollection && sub.subCollection.length > 0
      );
    },
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder;
    },
  },
};
</script>
<style>
/*@media screen and (min-width: 1024px) {
  .navbar-dropdown {
    width: 100vw;
    top: 72px;
    position: fixed;
  }
}*/

#main-content {
  margin-top: 72px;
}

.navbar-item {
  text-transform: uppercase;
  font-weight: bold;
}

.navbar-item.sub {
  font-weight: normal;
}

a.navbar-item:hover {
  text-decoration: underline;
}

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
  margin: 0 !important;
  justify-content: space-around !important;
}

#logo {
  max-height: 50px;
  height: 50px;
}

#search {
  padding-top: 16px;
}

#basket {
  padding-top: 21px;
  padding-right: 0;
  white-space: nowrap;
  margin-left: -60px;
}

#basket .icon {
  padding-left: 60px;
}

#top-navbar {
  padding-top: 0;
  padding-bottom: 0;
  height: 65px;
}

/* Notification */
.cart-badge {
  background: black;
  border-radius: 50%;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 12px;
}
</style>
