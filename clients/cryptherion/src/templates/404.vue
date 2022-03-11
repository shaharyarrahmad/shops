<template>
  <Layout>
    <br />
    <h1 class="title">404 - Deze pagina bestaat helaas niet</h1>

    <p>Misschien zoek je een van onderstaande categorieën?</p>

    <section
      class="py-4 category"
      v-for="collection of $context.collections"
      :key="collection.slug"
    >
      <g-link :to="`/categorie/${collection.slug}`">
        <h2>{{ collection.name }}</h2>
      </g-link>
      <div class="columns is-multiline is-mobile">
        <div
          class="column is-4-mobile is-2-tablet has-text-centered"
          v-for="childCollection of collection.children"
          :key="childCollection.slug"
        >
          <g-link :to="`/categorie/${childCollection.slug}`">
            <b-image
              :src="maybe(childCollection.featuredAsset, 'thumbnail')"
              ratio="1by1"
            ></b-image>
            {{ childCollection.name }}
          </g-link>
        </div>
      </div>
    </section>
  </Layout>
</template>
<script>
export default {
  methods: {
    maybe(obj, property) {
      return obj?.[property];
    },
  },
};
</script>
