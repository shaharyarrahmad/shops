<template>
  <Layout>
    <template #content>
      <h1 class="title is-1">{{ $context.category }}</h1>
      <br />

      <hr />
      <div class="columns" v-for="project of $context.projects">
        <div class="column is-4">
          <h2 class="title">{{ project.title }}</h2>
          <h3 class="subtitle">{{ project.subtitle }}</h3>
          <p v-html="project.description"></p>
        </div>
        <div class="column is-4">
          <div class="columns is-5 is-mobile is-multiline">
            <div class="column is-one-third">
              <figure class="image is-square">
                <PopupImage
                            small="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
                            alt="project.main_image.title"
                            large="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
                />
              </figure>
            </div>
            <div class="column is-one-third">
              <figure class="image is-square">
                <img
                  src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
                />
              </figure>
            </div>
            <div class="column is-one-third">
              <figure class="image is-square">
                <img
                  src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
                />
              </figure>
            </div>
            <div class="column is-one-third">
              <figure class="image is-square">
                <img
                  src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
                />
              </figure>
            </div>
            <div class="column is-one-third">
              <figure class="image is-square">
                <img
                  src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
                />
              </figure>
            </div>
            <div class="column is-one-third">
              <figure class="image is-square">
                <img
                  src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
                />
              </figure>
            </div>
            <div class="column is-one-third">
              <figure class="image is-square">
                <img
                  src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
                />
              </figure>
            </div>
            <div class="column is-one-third">
              <figure class="image is-square">
                <img
                  src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
                />
              </figure>
            </div>
            <div class="column is-one-third">
              <figure class="image is-square">
                <img
                  src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
                />
              </figure>
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
