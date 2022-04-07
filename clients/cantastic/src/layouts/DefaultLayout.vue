<template>
  <div>
    <b-navbar :fixed-top="true" type="is-danger" centered transparent>
      <template #brand>
        <div class="container is-widescreen section" id="top-navbar">
          <div class="columns is-mobile pt-2" style="width: 100%">
            <div class="column">
              <a href="/" aria-current="page"
                ><img src="/img/logo.png" alt="Cantastic.nl logo" id="logo"
              /></a>
            </div>
            <div class="column is-hidden-mobile" id="search">
              <b-field type="">
                <b-input icon="magnify" clearable></b-input>
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
        <div class="container is-widescreen section" id="navbar-items-wrapper">
          <template v-for="(collection, i) of $context.collections">
            <template v-if="!hasChildren(collection)">
              <!-------------------- Single collection ------------------>
              <g-link
                class="navbar-item is-uppercase navbar-link is-arrowless is-family-secondary"
                :to="`/categorie/${collection.slug}`"
              >
                {{ collection.name }}
              </g-link>
            </template>
            <template v-else>
              <!-------------------- Collection with children ------------------>
              <b-navbar-dropdown
                :label="collection.name"
                class="is-uppercase is-family-secondary"
                arrowless
                hoverable
              >
                <div class="container is-widescreen section py-1">
                  <div class="columns is-capitalized">
                    <template
                      v-for="subCollection of getChildrenWithChildren(
                        collection
                      )"
                    >
                      <!-------------------- Children with children ------------------>
                      <div
                        class="column is-3"
                        v-for="(chunk, i) of getChunks(
                          subCollection.children,
                          collection
                        )"
                      >
                        <h5 class="navbar-item is-hidden-mobile px-0">
                          {{ i == 0 ? subCollection.name : '&nbsp;' }}
                        </h5>
                        <g-link
                          v-for="subsub of chunk"
                          :key="subsub.slug"
                          :to="`/categorie/${subsub.slug}`"
                          class="navbar-item sub px-0"
                        >
                          {{ subsub.name }}
                        </g-link>
                      </div>
                    </template>
                    <!-------------------- Leaf children ------------------>
                    <template v-if="hasLeafChildren(collection)">
                      <div
                        class="column is-3"
                        v-for="(chunk, i) of getChunks(
                          getLeafChildren(collection),
                          collection
                        )"
                      >
                        <h5 class="navbar-item is-hidden-mobile px-0">
                          <template v-if="i == 0">
                            {{
                              hasChildrenWithChildren(collection)
                                ? 'Overig'
                                : collection.name
                            }}
                          </template>
                          <template v-else> &nbsp; </template>
                        </h5>
                        <template v-for="subCollection of chunk">
                          <g-link
                            class="navbar-item sub px-0"
                            :to="subCollection.slug"
                            >{{ subCollection.name }}
                          </g-link>
                        </template>
                      </div>
                    </template>
                  </div>
                </div>
              </b-navbar-dropdown>
            </template>
          </template>
        </div>
      </template>
    </b-navbar>

    <!-------------------- Content ------------------>
    <br />
    <br />
    <br />
    <div>
      <transition name="fade" appear>
        <div class="container is-widescreen section">
          <slot name="content" />
        </div>
      </transition>

      <div class="has-background-info">
        <div class="container is-widescreen section">
          <slot name="fullwidth" />
        </div>
      </div>

      <div class="container is-widescreen section">
        <slot name="content2" />
      </div>
    </div>

    <!--------------------------------- FOOTER ------------------------------->
    <footer class="footer has-background-warning has-text-white"></footer>
    <footer class="footer has-background-info has-text-white">
      <div class="columns">
        <div class="column is-3">
          <h5 class="has-text-white">Categorieën</h5>
          <g-link
            v-for="collection of $context.collections"
            :key="collection.slug"
            :to="`/categorie/${collection.slug}`"
          >
            {{ collection.name }} <br />
          </g-link>
        </div>
        <div class="column is-3">
          <h5 class="has-text-white">Service</h5>
          <g-link to="/over-ons">Bestelling & verzending</g-link>
          <br />
          <g-link to="/over-ons">Betalen</g-link>
          <br />
          <g-link to="/over-ons">Klachten</g-link>
          <br />
          <g-link to="/over-ons">FAQ</g-link>
          <br />
        </div>
        <div class="column is-3">
          <h5 class="has-text-white">Over Cantastic</h5>
          <g-link to="/over-ons">Over ons</g-link>
          <br />
          <g-link to="/over-ons">Contact</g-link>
          <br />
          <g-link to="/over-ons">Algemene voorwaarden</g-link>
          <br />
          <g-link to="/over-ons">Blog</g-link>
          <br />
        </div>
        <div class="column is-3">
          <h3 class="has-text-white">Volg @Cantastic.nl en #TeamJoopie</h3>
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
    hasChildren(collection) {
      return collection.children?.length > 0;
    },
    /**
     * Get child collections that don't have deeper children
     */
    getLeafChildren(collection) {
      return collection.children.filter((child) => !this.hasChildren(child));
    },
    /**
     * Checks if the collection has children that don't have deeper children
     */
    hasLeafChildren(collection) {
      return collection.children.some((child) => !this.hasChildren(child));
    },
    getChildrenWithChildren(collection) {
      return collection.children.filter((child) => this.hasChildren(child));
    },
    hasChildrenWithChildren(collection) {
      return collection.children.some((child) => this.hasChildren(child));
    },
    /**
     * Split children of collection into chunks based on the columns available:
     * If already 2 columns, only use 2 extra
     */
    getChunks(collections, parent) {
      const nrOfColumnsTaken = this.hasChildrenWithChildren(parent)
        ? parent.children.length
        : 1;
      let chunkSize = 20; // max chunksize
      if (nrOfColumnsTaken === 1) {
        // If only 1 column is taken, divide the other items over 3 columns
        chunkSize = Math.ceil(collections.length / 4);
      } else if (nrOfColumnsTaken === 2) {
        // if 2 columns taken, divide the other items over 2 columns
        chunkSize = Math.ceil(collections.length / 2);
      }
      const chunks = [];
      for (let i = 0; i < collections.length; i += chunkSize) {
        chunks.push(collections.slice(i, i + chunkSize));
      }
      return chunks;
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

.navbar-item {
  font-weight: bold;
  font-size: 0.9rem;
}

.navbar-item.sub {
  font-weight: normal;
}

a.navbar-item:hover,
.navbar-item a:hover {
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
}

.navbar-link {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

#navbar-items-wrapper {
  display: inherit;
  justify-content: space-between;
  padding-top: 0;
  padding-bottom: 0;
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
