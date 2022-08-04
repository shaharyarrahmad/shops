<template>
  <article>
    <g-link :to="`/blog/${blog.slug}`">
      <b-image
        :src="getSquareImage(blog.featured_image.id)"
        :alt="`Afbeelding voor ${blog.title}`"
        class="rounded blog-card-image"
      />
    </g-link>
    <h5 class="mb-1">{{ blog.title }}</h5>
    <p class="is-size-7 has-text-grey mb-2">
      {{ blog.date_created | formatDate }} door
      {{ blog.user_created.first_name }}
    </p>
    <p class="content">
      {{ blog.description }}
      <br />
      <g-link :to="`/blog/${blog.slug}`">Lees meer &nbsp; › </g-link>
    </p>
  </article>
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
.blog-card-image:hover,
.blog-card-image:focus {
  opacity: 0.9;
}
</style>
