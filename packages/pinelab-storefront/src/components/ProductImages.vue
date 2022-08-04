<template>
  <div>
    <!-- Multi assets carousel -->
    <b-carousel
      v-if="assets.length > 1"
      :arrow="true"
      :repeat="false"
      :arrow-hover="false"
      icon-pack="mdi"
      :autoplay="false"
    >
      <b-carousel-item v-for="(asset, i) in assets" :key="i">
        <PopupImage
          :small="getPreview(asset)"
          :alt="product.name"
          :large="getPreview(asset)"
          :assets="assetPreviews"
        />
      </b-carousel-item>
    </b-carousel>
    <!-- Single asset -->
    <PopupImage
      v-else
      :small="getPreview(featuredAsset)"
      :alt="product.name"
      :large="getPreview(featuredAsset)"
    />
    <!-- Smaller asset previews -->
    <div v-if="assets.length > 1" class="columns mt-2 is-mobile is-multiline">
      <div class="column is-one-fifth" v-for="asset of assets">
        <PopupImage
          :small="getThumbnail(asset)"
          :alt="product.name"
          :large="getPreview(asset)"
          :assets="assetPreviews"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      required: true,
    },
    variant: {
      required: false,
    },
  },
  data() {
    return {
      assets: [],
      assetPreviews: [],
      featuredAsset: undefined,
    };
  },
  watch: {
    product() {
      this.init();
    },
    variant() {
      this.init();
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // Initialize featuredAsset, sorted assets and assetPreviews
      this.featuredAsset =
        this.variant?.featuredAsset || this.product?.featuredAsset;
      const assets =
        this.variant?.assets?.length > 0
          ? this.variant?.assets
          : this.product?.assets || [];
      this.assets = this.sortByFeaturedAssetFirst(assets);
      this.assetPreviews = this.assets.map((a) => a?.preview);
    },
    getPreview(asset) {
      return asset?.preview;
    },
    getThumbnail(asset) {
      return asset?.thumbnail;
    },
    sortByFeaturedAssetFirst(assets) {
      // Set featuredAsset as first in array
      return assets.sort((a1, a2) =>
        a1.id === this.featuredAsset.id
          ? -1
          : a2.id === this.featuredAsset.id
          ? 1
          : 0
      );
    },
  },
};
</script>
