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
.card-background-image {
  min-height: 150px;
  box-shadow: inset 0 0 0 1000px rgba(35, 57, 91, 0.5);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100%;
}

.card-background-image:hover,
.card-background-image:focus {
  box-shadow: inset 0 0 0 1000px rgba(35, 57, 91, 0.1);
}
</style>
