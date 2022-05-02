<template>
  <DefaultLayout>
    <template #content>
      <section :id="$context.collection.slug">
        <div class="columns">
          <div
            v-if="$context.childCollections || $context.siblings"
            class="column is-3 siblings is-hidden-mobile"
          >
            <!---- Child or Sibling collection filter ----->
            <g-link
              v-for="collection of $context.childCollections ||
              $context.siblings"
              :to="`/categorie/${collection.slug}/`"
              :key="collection.slug"
              class="has-text-dark"
              :class="{ 'is-bold': collection.id === $context.collection.id }"
            >
              {{ collection.name }}<br />
            </g-link>
          </div>
          <div class="column">
            <!----------------Product list------------->
            <h1>{{ $context.collection.name }}</h1>
            <template v-if="$context.collection.description">
              <div
                v-html="$context.collection.description"
                class="collapsed content mb-0"
              ></div>
              <div class="has-text-right">
                <a href="#full-description">Lees meer</a>
              </div>
              <br />
            </template>
            <div class="has-text-right">
              <b>{{ $context.products.length }}</b> producten |
              <b-select
                placeholder="Sorteer op"
                style="display: inline-flex"
                @input="sort($event)"
              >
                <option value="price-asc">Prijs: laag - hoog</option>
                <option value="price-desc">Prijs: hoog - laag</option>
              </b-select>
            </div>

            <div class="columns is-6 is-variable is-multiline is-mobile">
              <template v-for="product of $context.products">
                <div
                  class="column is-6-mobile is-4-tablet is-one-fifth-desktop"
                >
                  <ProductCard :product="product" />
                </div>
              </template>
            </div>
          </div>
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
    sortDesc(product1, product2) {
      if (product1.lowestPrice > product2.lowestPrice) {
        return -1;
      } else if (product1.lowestPrice < product2.lowestPrice) {
        return 1;
      } else {
        return 2;
      }
    },
    sort(value) {
      if (value === 'price-desc') {
        this.$context.products.sort(this.sortDesc);
      } else {
        this.$context.products.sort(this.sortDesc).reverse();
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
.siblings a:hover {
  text-decoration: underline;
}
.is-bold {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
