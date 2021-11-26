<template>
  <Layout>
    <template #content>
      <h1>{{ $context.bio.title }}</h1>

      <div v-html="$context.bio.text"></div>
      <br />

      <div class="columns is-multiline is-mobile">
        <div
          class="column is-half-mobile is-one-quarter-tablet mb-4"
          v-for="image of $context.bio.images"
        >
          <PopupImage
            :small="getSquareImage(image.directus_files_id.id)"
            :alt="image.directus_files_id.title"
            :large="getDefaultImage(image.directus_files_id.id)"
            placeholder="/img/placeholder.png"
          />
        </div>
      </div>
    </template>
  </Layout>
</template>
<script>
export default {};
</script>
