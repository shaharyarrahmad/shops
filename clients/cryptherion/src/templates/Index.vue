<template>
  <Layout>
    <div class="mb-2 has-text-centered">
      <img
        src="/img/cryptherion-logo-black.svg"
        alt="Cryptherion logo"
        class="hero-logo"
      />
      <section id="usps" class="is-dark">
        <div class="content has-text-centered">
          <!--          <span class="line">
            <b-icon
              v-for="i of 5"
              :key="`star${i}`"
              icon="star-circle"
              size="is-small"
              type="is-warning"
            ></b-icon>
            <span class="mx-2"
              >Bekijk onze reviews op
              <a href="https://www.trustpilot.com/" target="_blank"
                >Trustpilot</a
              ></span
            >
          </span>-->

          <span class="line">
            <b-icon
              class="mx-2"
              icon="check-circle"
              size="is-small"
              type="is-success"
            >
            </b-icon>
            <span>Voor 23:00 besteld volgende dag in huis</span>
          </span>

          <span class="line">
            <b-icon
              class="mx-2"
              icon="phone"
              size="is-small"
              type="is-success"
            ></b-icon>
            <a :href="`tel:${$context.global.telefoon}`">{{
              $context.global.telefoon
            }}</a>
          </span>

          <span class="line">
            <b-icon
              class="mx-2"
              icon="email"
              size="is-small"
              type="is-success"
            ></b-icon>
            <a :href="`mailto:${$context.global.email}`">{{
              $context.global.email
            }}</a>
          </span>

          <!--          <span class="line">
            <b-icon
              class="mx-2"
              icon="check-circle"
              size="is-small"
              type="is-success"
            >
            </b-icon>
            <span class="mr-2">Betaal met Bitcoin</span>
          </span>-->
        </div>
      </section>
    </div>

    <section
      v-if="$context.featuredProduct"
      class="hero is-halfheight main-feature px-5 is-light-blue mb-2"
    >
      <div class="columns">
        <div class="column">
          <h1 class="title py-6">
            {{ $context.featuredProduct.name }}
          </h1>
          <p class="subtitle">
            {{ getMainFeatureText($context.featuredProduct) }}
          </p>
          <g-link
            :to="`/product/${$context.featuredProduct.slug}`"
            class="is-info is-fullwidth button is-large"
            style="padding: 30px"
          >
            <h2>
              {{ $context.featuredProduct.lowestPrice | euro }}
              <span class="icon is-large ml-4"
                ><i class="mdi mdi-alert-octagram"></i
              ></span>
            </h2>
          </g-link>
        </div>

        <div class="column">
          <b-image
            :src="maybe($context.featuredProduct.featuredAsset, 'preview')"
            :alt="$context.featuredProduct.name"
            ratio="1by1"
          />
        </div>
      </div>
    </section>

    <section
      class="py-4 category"
      v-for="collection of $context.collections"
      :key="collection.slug"
    >
      <g-link :to="`/categorie/${collection.slug}`">
        <h2>{{ collection.name }}</h2>
      </g-link>
      <div class="columns is-multiline is-mobile">
        <div
          class="column is-4-mobile is-2-tablet has-text-centered"
          v-for="childCollection of collection.children"
          :key="childCollection.slug"
        >
          <g-link :to="`/categorie/${childCollection.slug}`">
            <b-image
              :src="maybe(childCollection.featuredAsset, 'thumbnail')"
              ratio="1by1"
            ></b-image>
            {{ childCollection.name }}
          </g-link>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import ProductCard from 'pinelab-storefront-client/lib/buefy-components/ProductCard';
import { hydrate } from 'pinelab-storefront-client';

export default {
  components: {
    ProductCard,
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
    await hydrate(this.$context.products, this.$vendure);
  },
  methods: {
    maybe(obj, property) {
      return obj?.[property];
    },
    getMainFeatureText(product) {
      const facet = product.facetValues.find((f) => f.code === 'main-feature');
      return facet?.name || 'main featured product';
    },
  },
};
</script>
<style></style>
