<template>
  <DefaultLayout>
    <template #content>
      <section :id="$context.collection.slug">
        <h1>{{ $context.collection.name }}</h1>

        <br />

        <template v-if="$context.childCollections">
          <!------------------- Subcollections ------------------->
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
        </template>
        <template v-else>
          <!------------------ Product listing ----------------------->
          <template v-if="$context.collection.description">
            <div
              v-html="$context.collection.description"
              class="collapsed content"
            ></div>
            <div class="has-text-right">
              <a href="#full-description">Lees meer</a>
            </div>
          </template>

          <div class="columns is-6 is-variable is-multiline is-mobile">
            <template v-for="product of $context.products">
              <div class="column is-6-mobile is-4-tablet is-one-fifth-desktop">
                <ProductCard :product="product" />
              </div>
            </template>
          </div>
        </template>
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
.collapsed {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
}

#full-description::before {
  display: block;
  content: ' ';
  margin-top: -285px;
  height: 285px;
  visibility: hidden;
  pointer-events: none;
}
</style>
