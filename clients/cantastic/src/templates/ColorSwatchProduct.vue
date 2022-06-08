<template>
  <DefaultLayout #content>
    <div class="columns is-mobile">
      <div class="column is-6-mobile is-3-tablet">
        <img :src="$context.product.featuredAsset.preview" />
      </div>
      <div class="column">
        <h1 class="title">{{ $context.product.name }}</h1>
        <h5 class="is-size-5">{{ $context.product.lowestPrice | euro }}</h5>
        <template v-if="$context.product.description">
          <div class="collapsed-3" v-html="$context.product.description"></div>
          <div class="has-text-right">
            <a href="#full-description">Lees meer</a>
          </div>
          <br />
        </template>
      </div>
    </div>
    <div class="columns">
      <div class="column" v-for="chunk of getChunks($context.product.variants)">
        <template v-for="variant of chunk">
          <SwatchBlock
            :variant="variant"
            :bg-color="variant.bgColor"
            :text-color="variant.textColor"
          />
        </template>
      </div>
    </div>

    <h2 class="title">{{ $context.product.name }}</h2>
    <div
      id="full-description"
      v-if="$context.product.description"
      v-html="$context.product.description"
    ></div>
  </DefaultLayout>
</template>
<script>
import ProductImages from 'pinelab-storefront-client/lib/buefy-components/ProductImages';
import SwatchBlock from '../components/SwatchBlock';
import { hydrate } from 'pinelab-storefront-client';

export default {
  components: {
    ProductImages,
    SwatchBlock,
  },
  data() {
    return {};
  },
  async mounted() {
    await hydrate(this.$context.product, this.$vendure);
  },
  methods: {
    getChunks(variants) {
      const chunkSize = Math.ceil(variants.length / 4);
      const chunks = [];
      for (let i = 0; i < variants.length; i += chunkSize) {
        chunks.push(variants.slice(i, i + chunkSize));
      }
      return chunks;
    },
  },
};
</script>
<style></style>
