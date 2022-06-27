<template>
  <DefaultLayout>
    <template #content>
      <section :id="$context.collection.slug">
        <h1>{{ $context.collection.name }}</h1>
        <br />

        <div class="columns is-multiline is-mobile">
          <template v-for="collection of $context.childCollections">
            <div
              class="column is-6-mobile is-4-tablet"
              :class="getColumnWidth($context.childCollections)"
            >
              <g-link :to="`/categorie/${collection.slug}/`">
                <CategoryCard
                  :name="collection.name"
                  :image="maybeThumbnail(collection.featuredAsset)"
                />
              </g-link>
            </div>
          </template>
        </div>
        <div
          id="full-description"
          v-if="$context.collection.description"
          v-html="$context.collection.description"
        ></div>
      </section>
    </template>
  </DefaultLayout>
</template>
<script>
export default {
  methods: {
    getColumnWidth(collections) {
      if (collections.length === 2) {
        return 'is-6-desktop';
      } else if (collections.length === 3) {
        return 'is-one-third-desktop';
      } else {
        return 'is-one-fifth-desktop';
      }
    },
  },
};
</script>
<style>
.siblings a:hover {
  text-decoration: underline;
}

.is-bold {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
