<template>
  <div>
    <ShopNavBar
      logo="/cantastic_logo.png"
      logo-alt="Pinelab logo"
      cart-link="/cart/"
      :activeOrder="activeOrder"
    >
      <template v-for="(collection, index) of collections">
        <!-- Collections with subCollections -->
        <div
          v-if="collection.subCollection"
          :key="`${collection.slug}-${index}`"
          class="navbar-item has-dropdown is-hoverable"
        >
          <g-link :to="collection.slug" class="navbar-link">
            {{ collection.name }}
          </g-link>
          <div class="navbar-dropdown" style="overflow: hidden">
            <!-- Multi column drop down -->
            <div v-if="hasSubSubCollection(collection)">
              <div class="columns">
                <div
                  class="column is-3"
                  v-for="(subCollection, index) of collection.subCollection"
                >
                  <h5 class="navbar-item">{{ subCollection.name }}</h5>
                  <g-link
                    class="navbar-item"
                    v-for="(subsub, index) of subCollection.subCollection"
                    :to="subsub.slug"
                    :key="`${subsub.slug}-${index}`"
                  >
                    {{ subsub.name }}
                  </g-link>
                </div>
              </div>
            </div>
            <!-- Single column for subcollection without sub-sub-->
            <div v-else>
              <g-link
                class="navbar-item"
                v-for="(subCollection, index) of collection.subCollection"
                :to="subCollection.slug"
                :key="`${subCollection.slug}-${index}`"
              >
                {{ subCollection.name }}
              </g-link>
            </div>
          </div>
        </div>
        <!-- No dropdown, because no subCollections -->
        <g-link v-else :to="collection.slug" class="navbar-item">
          {{ collection.name }}
        </g-link>
      </template>
    </ShopNavBar>

    <!--    USP bar   -->
    <div class="has-text-centered has-background-info has-text-light usp-bar">
      USPS
    </div>

    <div class="container is-widescreen section" style="min-height: 90vh">
      <b-button v-if="$context.showBack" tag="a" @click="$router.go(-1)">
        <
      </b-button>

      <br />

      <slot />
    </div>

    <footer class="footer">
      <div class="content has-text-centered is-dark">
        Cantastic •
        <a href="https://pinelab.studio/" target="_blank">Made by Pinelab 🌲</a>
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
  data() {
    return {
      collections: [
        {
          name: 'Spray paint & caps',
          slug: '/shop/',
          subCollection: [
            {
              name: 'Spraypaint',
              slug: '/sub1/',
              subCollection: [
                {
                  name: 'Loop Colors 400ml',
                  slug: '/sub/',
                },
                {
                  name: 'Loop Colors 600ml',
                  slug: '/sub/',
                },
                {
                  name: 'Montana black 400ml',
                  slug: '/sub/',
                },
              ],
            },
            {
              name: 'Caps',
              slug: '/shop/',
              subCollection: [
                {
                  name: 'Skinny caps',
                  slug: '/sub3/',
                },
                {
                  name: 'Soft caps',
                  slug: '/sub3/',
                },
              ],
            },
          ],
        },
        {
          name: 'Markers',
          slug: '/shop/',
        },
        {
          name: 'Uitrusting',
          slug: '/shop/',
        },
        {
          name: 'Tekenen & Stickers',
          slug: '/shop/',
        },
        {
          name: 'Kleding',
          slug: '/shop/',
          subCollection: [
            {
              name: 'T-shirts',
              slug: '/sub2/',
            },
            {
              name: 'Sweaters',
              slug: '/sub2/',
            },
            {
              name: 'Hoodies',
              slug: '/sub2/',
            },
          ],
        },
        {
          name: 'Boeken & magazines',
          slug: '/shop/',
        },
        {
          name: 'Prints',
          slug: '/shop/',
        },
        {
          name: 'Blog',
          slug: '/shop/',
        },
      ],
    };
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
.usp-bar {
  margin-top: 32px;
}
</style>
