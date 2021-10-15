<template>
  <Layout>
    <template #content>
      <h1 class="title">{{  $context.bio.title }}</h1>
      <img class="bio-image" :src="getDefaultImage($context.bio.image.id)" :alt="$context.bio.image.title">
      <div v-html="$context.bio.text">
      </div>
    </template>
  </Layout>
</template>
<script>
export default {};
</script>
<style>
h2, h3, h4 {
  font-weight: bold;
  margin: 1rem 0 0.8rem 0;
}
.bio-image {
  height: 300px;
  width: 100%;
  object-fit: cover;
}
</style>
