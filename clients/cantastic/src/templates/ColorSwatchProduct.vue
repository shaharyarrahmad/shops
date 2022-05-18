<template>
  <DefaultLayout #content>
    <br />
    <div class="columns is-mobile">
      <div class="column is-4-mobile is-2-tablet">
        <img :src="$context.product.featuredAsset.preview" />
      </div>
      <div class="column">
        <h1 class="title">{{ $context.product.name }}</h1>
        <h5 class="is-size-5">{{ $context.product.lowestPrice | euro }}</h5>
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
  </DefaultLayout>
</template>
<script>
import ProductImages from 'pinelab-storefront-client/lib/buefy-components/ProductImages';
import SwatchBlock from '../components/SwatchBlock';

export default {
  components: {
    ProductImages,
    SwatchBlock,
  },
  data() {
    return {};
  },
  methods: {
    getChunks(variants) {
      const chunkSize = Math.ceil(variants.length / 3);
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
