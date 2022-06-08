<template>
  <DefaultLayout>
    <template #content>
      <section :id="$context.collection.slug">
        <div class="columns">
          <div
            v-if="$context.childCollections || $context.siblings"
            class="column is-3 siblings is-hidden-mobile"
          >
            <!---- Desktop filter ----->
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
            <!----------------Title ------------->
            <h1>{{ $context.collection.name }}</h1>

            <!-- Mobile filter --------->
            <div class="is-hidden-desktop is-hidden-tablet">
              <g-link
                v-for="collection of $context.childCollections ||
                $context.siblings"
                :to="`/categorie/${collection.slug}/`"
                :key="collection.slug"
                class="button is-small mr-2 mb-2"
                :class="{
                  'is-primary': collection.id === $context.collection.id,
                }"
              >
                {{ collection.name }}<br />
              </g-link>
            </div>
            <template v-if="$context.collection.description">
              <div
                v-html="$context.collection.description"
                class="collapsed-1 content mb-0"
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
                v-model="sortedBy"
                @input="sort($event)"
              >
                <option value="price-asc">Prijs: laag - hoog</option>
                <option value="price-desc">Prijs: hoog - laag</option>
              </b-select>
            </div>

            <!----------------Products ------------->
            <div class="columns is-6 is-variable is-multiline is-mobile">
              <template v-for="product of products">
                <div class="column is-6-mobile is-4-tablet is-3-desktop">
                  <ProductCard :product="product" />
                </div>
              </template>
            </div>

            <!-------------- Pagination ----------------------->
            <br />
            <div v-if="$context.products.length > itemsPerPage" class="columns">
              <div class="column">
                <Pagination
                  :total="$context.products.length"
                  @change="setPage($event)"
                />
              </div>
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
import Pagination from '../components/Pagination';
export default {
  components: { Pagination },
  data() {
    return {
      current: 1,
      itemsPerPage: 24,
      products: [],
      sortedBy: 'price-asc',
    };
  },
  created() {
    this.loadFirstPage();
    this.sort(this.sortedBy);
  },
  methods: {
    setPage({ start, end }) {
      console.log(`Display products ${start} - ${end}`);
      this.products = this.$context.products.slice(start, end);
    },
    loadFirstPage() {
      this.current = 1;
      this.products = this.$context.products.slice(0, this.itemsPerPage);
    },
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
      this.loadFirstPage();
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
