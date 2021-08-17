<template>
  <Layout>
    <template #content>
      <h1 class="title is-1">{{ $context.page.title }}</h1>
      <br />

      <div class="columns is-multiline is-mobile">

        <div class="column is-6-desktop is-6-tablet is-12-mobile"
             v-for="project in $context.page.projects">
          <g-link :to="`/portfolio/${project.slug}`">
            <h2 class="title is-2 has-text-centered"> {{ project.title }}</h2>
            <figure class="image is-square">
              <img src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg" />
            </figure>
          </g-link>
        </div>

      </div>

    </template>
  </Layout>
</template>
<script>
export default {};
</script>
