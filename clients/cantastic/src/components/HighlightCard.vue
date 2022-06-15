<template>
  <g-link :to="`/categorie/${collection.slug}/`">
    <div
      class="box card-background-image is-flex is-align-items-end highlight-card"
      :style="`background-image: url(${image});`"
    >
      <div>
        <h3 class="has-text-white pt-5">{{ collection.name }}</h3>
        <CantasticButton is-div="true"> Bekijk deal</CantasticButton>
      </div>
    </div>
  </g-link>
</template>
<script>
import CantasticButton from './CantasticButton';

export default {
  components: { CantasticButton },
  props: ['collection'],
  computed: {
    image() {
      return this.collection?.featuredAsset?.preview;
    },
  },
};
</script>
<style>
.card-background-image.highlight-card {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
