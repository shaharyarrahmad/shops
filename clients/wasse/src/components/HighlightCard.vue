<template>
  <g-link to="/">
    <div class="card card-background-image container-overlay">
      <div class="card-image is-fullheight">
        <b-image class="is-fullheight" ratio="2by1" :src="image"></b-image>
        <div class="overlay"></div>
      </div>
      <div class="card-content has-background-success">
        <div class="media">
          <div class="media-content">
            <p class="title has-text-white has-text-weight-bold is-5">
              {{ title }}
            </p>
            <HomeButton>Koop nu</HomeButton>
          </div>
        </div>
      </div>
    </div>
  </g-link>
</template>
<script>
import HomeButton from '@/components/HomeButton';

export default {
  props: ['title', 'image'],
  components: { HomeButton },
};
</script>
<style>
.card-background-image {
  min-height: 150px;
  max-height: 470;
  height: 100%;
}

.card-content {
  bottom: 0;
  z-index: 1;
  position: absolute;
  width: 100%;
}

.is-fullheight,
.is-fullheight img {
  height: 100%;
}
</style>
