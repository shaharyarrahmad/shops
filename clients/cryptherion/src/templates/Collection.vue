<template>
  <Layout>
    <section id="category-intro" class="mb-6">
      <!--      <h1 class="has-text-centered pb-2">{{ $context.collection.name }}</h1>-->
      <img
        class="collection-banner"
        :src="maybe($context.collection.featuredAsset, 'preview')"
        :alt="`Categorie ${$context.collection.name}`"
      />
      <div
        :class="{ collapsed: collapsed }"
        v-html="$context.collection.description"
      ></div>
      <div class="has-text-right">
        <a @click="collapsed = !collapsed">
          <b-icon pack="mdi" :icon="collapsed ? 'chevron-down' : 'chevron-up'">
          </b-icon>
        </a>
      </div>
    </section>

    <div v-if="parentCollection">
      We are in subcollection {{ $context.collection.name }}
      <ProductFilter
        :collections="$context.siblingCollections"
        no-collection-url="/categorie/"
        :selected-collection="$context.collection"
      />
    </div>

    <div class="columns is-multiline is-mobile">
      <div
        class="column is-half-mobile is-one-quarter-tablet mb-4"
        v-for="product of $context.products"
        :key="product.slug"
      >
        <ProductCard
          :product="product"
          buy-label="Add to cart"
          product-url-prefix="product"
          soldoutLabel="Sold out"
        />
      </div>
    </div>
  </Layout>
</template>

<script>
import ProductCard from 'pinelab-storefront-client/lib/buefy-components/ProductCard';
import ProductFilter from 'pinelab-storefront-client/lib/buefy-components/ProductFilter';
import { hydrate } from 'pinelab-storefront-client';

export default {
  components: {
    ProductCard,
    ProductFilter,
  },
  data() {
    return {
      collapsed: true,
    };
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
    await hydrate(this.$context.products, this.$vendure);
  },
  methods: {
    maybe(obj, property) {
      return obj?.[property];
    },
  },
};
</script>
<style>
.collection-banner {
  max-height: 200px;
  width: 100%;
  object-fit: cover;
}

.collapsed {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
