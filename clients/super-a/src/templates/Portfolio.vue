<template>
  <Layout>
    <template #content>
      <h1>Portfolio</h1>
      <br />

      <div class="columns">
        <div class="column is-6">
          <hr style="margin-top: 0" />
          <template v-for="category in $context.categories">
            <g-link :to="`/portfolio/${category}`">
              <h4 class="is-link pb-2">{{ category }}</h4>
            </g-link>
          </template>
        </div>
        <div class="column is-6">
          <g-link
            :to="`/portfolio/${$context.projects[0].categories[0]}#${$context.projects[0].title}`"
          >
            <b-image
              :src="getSquareImage($context.projects[0].main_image.id)"
              :alt="$context.projects[0].main_image.title"
              placeholder="/img/placeholder.png"
            />
          </g-link>
        </div>
      </div>

      <div class="columns is-mobile is-multiline">
        <div
          v-for="(project, index) of $context.projects.slice(1)"
          :class="isLargeRow(index + 1) ? 'column is-6' : 'column is-4'"
        >
          <g-link :to="`/portfolio/${project.categories[0]}#${project.title}`">
            <figure class="image is-square">
              <img :src="getSquareImage(project.main_image.id)" />
            </figure>
          </g-link>
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
  methods: {
    isLargeRow(rowIndex) {
      return rowIndex % 5 === 4 || rowIndex % 5 === 0;
    },
  },
};
</script>
<style>
.is-link {
  text-decoration: underline;
}
</style>
