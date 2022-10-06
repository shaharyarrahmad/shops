<template>
  <g-link to="/">
    <div class="card container-overlay">
      <div class="card-image">
        <figure class="image is-1by1">
          <img :src="image" />
        </figure>
        <div class="overlay"></div>
        <div class="centered">
          <p
            class="title has-text-weight-bold has-text-white has-text-centered is-4"
          >
            {{ title }}
          </p>
        </div>
      </div>
    </div>
  </g-link>
</template>
<script>
export default {
  props: ['title', 'price', 'image'],
};
</script>
