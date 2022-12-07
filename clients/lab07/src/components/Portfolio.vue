<template>
  <section
    class="hero is-justify-content-center is-flex-direction-row"
    style="padding-top: 100px"
  >
    <div class="tile has-text-centered">
      <div class="tile is-parent">
        <b-carousel
          :repeat="false"
          :arrow="true"
          :arrow-hover="false"
          :autoplay="false"
          animated="slide"
        >
          <b-carousel-item v-for="(image, i) in images" :key="i">
            <PopupImage
              :small="getSquareImage(image.directus_files_id.id)"
              :alt="image.directus_files_id.title"
              :large="getDefaultImage(image.directus_files_id.id)"
            />
          </b-carousel-item>
        </b-carousel>
      </div>
      <div class="tile is-parent is-vertical">
        <article class="tile is-child">
          <p class="portfolio-title">{{ title }}</p>
        </article>
        <article class="tile is-child">
          <div v-html="description" class="subtitle"></div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['title', 'description', 'images'],
  data() {
    return {};
  },
};
</script>
<style>
.tile {
  max-width: 1000px;
  align-items: center;
}

.portfolio-title {
  font-size: 3rem;
}

@media only screen and (max-width: 768px) {
  .tile {
    max-width: 400px;
  }
  .portfolio-title {
    font-size: 2rem;
  }
}
@media only screen and (max-width: 500px) {
  .tile {
    max-width: 300px;
  }
  .portfolio-title {
    font-size: 2rem;
  }
}
</style>
