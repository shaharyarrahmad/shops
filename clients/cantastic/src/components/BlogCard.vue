<template>
  <div>
    <g-link :to="`/blog/${blog.slug}`">
      <img
        :src="getSquareImage(blog.featured_image.id)"
        :alt="`Afbeelding voor ${blog.title}`"
        class="rounded blog-card-image"
      />
    </g-link>
    <h4 class="mb-1">{{ blog.title }}</h4>
    <p>
      {{ blog.description }}
      <br />
      <g-link :to="`/blog/${blog.slug}`">Lees meer &nbsp; › </g-link>
    </p>
  </div>
</template>
<script>
export default {
  props: ['blog'],
};
</script>
<style>
.blog-card-image {
  height: 300px;
  width: 100%;
  object-fit: cover;
}
</style>
