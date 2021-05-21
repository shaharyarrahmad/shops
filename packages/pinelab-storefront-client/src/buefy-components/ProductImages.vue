<template>
  <div>
    <b-image
      :src="getPreview(asset)"
      :alt="product.name"
    />
    <div class="columns mt-2 is-5 is-mobile">
      <div class="column is-one-fifth" v-for="asset of assets">
        <div @click="selectedAsset = asset">
          <b-image
            :src="getThumbnail(asset)"
            :alt="product.name"
            ratio="1by1"
            class="is-clickable"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      required: true
    },
    variant: {
      required: true
    }
  },
  watch: {
    variant() {
      this.selectedAsset = undefined
    },
  },
  data() {
    return { selectedAsset: undefined };
  },
  computed: {
    asset() {
      return this.selectedAsset || this.variant?.featuredAsset || this.product?.featuredAsset;
    },
    assets() {
      return this.variant?.assets || this.product?.assets;
    }
  },
  methods: {
    getPreview(asset) {
      return asset?.preview;
    },
    getThumbnail(asset) {
      return asset?.thumbnail;
    }
  }
};
</script>