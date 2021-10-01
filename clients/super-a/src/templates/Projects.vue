<template>
  <Layout>
    <template #content>
      <h1 class="title is-1">{{ $context.category }}</h1>
      <br />

      <section :id="project.title" v-for="project of $context.projects">
      <hr />
      <div class="columns" >
        <div class="column is-4">
          <h2 class="title">{{ project.title }}</h2>
          <h3 class="subtitle">{{ project.subtitle }}</h3>
          <div v-html="project.description"></div>
        </div>
        <div class="column is-4">
          <div class="columns is-5 is-mobile is-multiline">
            <div class="column is-one-third" v-for="image of project.images">
                <PopupImage
                            :small="getSquareImage(image.directus_files_id.id)"
                            :alt="image.directus_files_id.title"
                            :large="getDefaultImage(image.directus_files_id.id)"
                />
            </div>
          </div>
        </div>
        <div class="column is-4">
          <iframe v-if="project.video_url"
            width="100%"
            height="auto"
            :src="project.video_url"
            :title="project.title"
            allow="autoplay; picture-in-picture"
            allowfullscreen
            class="portfolio-iframe"
          ></iframe>
          <PopupImage v-else
            :small="getSquareImage(project.main_image.id)"
            :alt="project.main_image.title"
            :large="getDefaultImage(project.main_image.id)"
          />
        </div>
      </div>
      <br />
      </section>

    </template>
  </Layout>
</template>
<script>
export default {};
</script>
<style>
.portfolio-iframe {
  height: 100%;
  min-height: 300px;
}
</style>
