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
              <b-field type="">
                <b-input icon="magnify" clearable> </b-input>
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
      <!-------------------- Nav items ------------------>
      <template #start>
        <template v-for="collection of $context.collections">
          <template v-if="!hasSub(collection)">
            <!-------------------- Single collection ------------------>
            <g-link
              class="navbar-item is-uppercase"
              :to="`/categorie/${collection.slug}`"
            >
              {{ collection.name }}</g-link
            >
          </template>
          <template v-else>
            <!-------------------- Collection with children ------------------>
            <b-navbar-dropdown
              :label="collection.name"
              class="is-uppercase"
              arrowless
              hoverable
            >
              <div class="columns is-centered my-3 is-capitalized">
                <template
                  v-for="subCollection of getChildrenWithChildren(
                    collection.children
                  )"
                >
                  <!-------------------- Children with children ------------------>
                  <div class="column is-3">
                    <h5 class="navbar-item is-hidden-mobile">
                      {{ subCollection.name }}
                    </h5>
                    <g-link
                      v-for="subsub of subCollection.children"
                      :key="subsub.slug"
                      :to="`/categorie/${subsub.slug}`"
                      class="navbar-item sub"
                    >
                      {{ subsub.name }}
                    </g-link>
                  </div>
                </template>
                <!-------------------- Leaf children ------------------>
                <div class="column is-3">
                  <h5
                    class="navbar-item is-hidden-mobile"
                    v-if="
                      hasLeafChildren(collection.children) &&
                      hasChildrenWithChildren(collection.children)
                    "
                  >
                    Overig
                  </h5>
                  <template
                    v-for="subCollection of getLeafChildren(
                      collection.children
                    )"
                  >
                    <g-link class="navbar-item sub" :to="subCollection.slug">{{
                      subCollection.name
                    }}</g-link>
                  </template>
                </div>
              </div>
            </b-navbar-dropdown>
          </template>
        </template>
      </template>
    </b-navbar>

    <!-------------------- Content ------------------>
    <div class="container is-widescreen section">
      <br />
      <slot name="content" />
    </div>
    <slot name="fullwidth" />

    <div class="container is-widescreen section">
      <slot name="content2" />
    </div>

    <footer class="footer has-background-warning has-text-light"></footer>
    <footer class="footer has-background-info has-text-light">
      <div class="columns">
        <div class="column is-3">
          <h5 class="has-text-light">Categorieën</h5>
          <g-link
            v-for="collection of $context.collections"
            :key="collection.slug"
            :to="`/categorie/${collection.slug}`"
          >
            {{ collection.name }} <br />
          </g-link>
        </div>
        <div class="column is-3">
          <h5 class="has-text-light">Service</h5>
          <g-link to="/over-ons">Bestelling & verzending</g-link><br />
          <g-link to="/over-ons">Betalen</g-link><br />
          <g-link to="/over-ons">Klachten</g-link><br />
          <g-link to="/over-ons">FAQ</g-link><br />
        </div>
        <div class="column is-3">
          <h5 class="has-text-light">Over Cantastic</h5>
          <g-link to="/over-ons">Over ons</g-link><br />
          <g-link to="/over-ons">Contact</g-link><br />
          <g-link to="/over-ons">Algemene voorwaarden</g-link><br />
          <g-link to="/over-ons">Blog</g-link><br />
        </div>
      </div>
    </footer>
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
    hasSub(collection) {
      return collection.children?.length > 0;
    },
    getLeafChildren(collections) {
      return collections.filter((child) => !this.hasSub(child));
    },
    hasLeafChildren(collections) {
      return this.getLeafChildren(collections).length > 0;
    },
    getChildrenWithChildren(collections) {
      return collections.filter((child) => this.hasSub(child));
    },
    hasChildrenWithChildren(collections) {
      return this.getChildrenWithChildren(collections).length > 0;
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
@media screen and (max-width: 1024px) {
  .navbar-dropdown .columns,
  .navbar-dropdown .column {
    padding-top: 0;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
}

#main-content {
  margin-top: 72px;
}

.navbar-item {
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
