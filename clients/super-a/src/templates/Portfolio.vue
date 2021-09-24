<template>
  <Layout>
    <template #content>
      <h1 class="title is-1">Portfolio</h1>
      <br />

      <div class="columns">
        <div class="column is-6">
          <hr style="margin-top: 0" />
          <template v-for="category in $context.categories">
            <g-link :to="`/portfolio/${category}`">
              <h2 class="title is-2 is-link pb-4">{{ category }}</h2>
            </g-link>
          </template>
        </div>
        <div class="column is-6">
          <figure class="image is-square">
            <img
              src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
            />
          </figure>
        </div>
      </div>

      <div class="columns is-mobile is-multiline">
        <!-- 3 -->
        <div class="column is-4">
          <figure class="image is-square">
            <img
              src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
            />
          </figure>
        </div>
        <div class="column is-4">
          <figure class="image is-square">
            <img
              src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
            />
          </figure>
        </div>
        <div class="column is-4">
          <figure class="image is-square">
            <img
              src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
            />
          </figure>
        </div>

        <!-- 2 -->
        <div class="column is-6">
          <figure class="image is-square">
            <img
              src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
            />
          </figure>
        </div>
        <div class="column is-6">
          <figure class="image is-square">
            <img
              src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
            />
          </figure>
        </div>

        <!-- 3 -->
        <div class="column is-4">
          <figure class="image is-square">
            <img
              src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
            />
          </figure>
        </div>
        <div class="column is-4">
          <figure class="image is-square">
            <img
              src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
            />
          </figure>
        </div>
        <div class="column is-4">
          <figure class="image is-square">
            <img
              src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg"
            />
          </figure>
        </div>
      </div>
    </template>
  </Layout>
</template>
<script>
export default {
  metaInfo: {
    title: 'Portfolio',
  },
};
</script>
<style>
.is-link {
  text-decoration: underline;
}
</style>
