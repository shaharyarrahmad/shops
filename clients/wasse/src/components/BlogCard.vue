<template>
  <g-link :to="`/blog/${title.slug}`">
    <div class="card container-overlay">
      <div class="card-image">
        <figure class="image is-3by2">
          <img :src="image" />
        </figure>
        <div class="overlay"></div>
      </div>
      <div class="card-content has-background-success">
        <div class="media">
          <div class="media-content">
            <p class="title has-text-white has-text-weight-bold is-5">
              {{ title }}
            </p>
            <WasseHomeButton>Lees meer</WasseHomeButton>
          </div>
        </div>
      </div>
    </div>
  </g-link>
</template>
<script>
import WasseHomeButton from '@/components/WasseHomeButton.vue';

export default {
  props: ['title', 'title.slug', 'image'],
  components: { WasseHomeButton },
};
</script>
<style>
.card-content {
  bottom: 0;
  z-index: 1;
  position: absolute;
  width: 100%;
}
</style>
