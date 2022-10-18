<template>
  <g-link :to="slug">
    <div class="card container-overlay">
      <div class="card-image">
        <figure class="image is-3by2">
          <img :src="image" />
        </figure>
        <div class="overlay"></div>
      </div>
      <div class="card-content-no-show has-background-success p-5">
        <div class="media">
          <div class="media-content">
            <p class="title has-text-white has-text-weight-bold is-5">
              {{ title }}
            </p>
            <HomeButton>Lees meer</HomeButton>
          </div>
        </div>
      </div>
    </div>
  </g-link>
</template>
<script>
import HomeButton from '@/components/HomeButton.vue';

export default {
  props: ['title', 'slug', 'image'],
  components: { HomeButton },
};
</script>
<style>
.card-content-no-show {
  bottom: 0;
  z-index: 1;
  position: absolute;
  width: 100%;
}
</style>
