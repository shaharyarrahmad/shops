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
            <ReadMoreDescription
              :description="$context.collection.description"
              max-length="100"
              collapse="1"
            />
            <div v-if="totalProducts > 5" class="has-text-right">
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
            <div v-if="totalProducts > itemsPerPage" class="columns">
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
          v-html="$context.collection.description"
        ></div>
      </section>
    </template>
  </DefaultLayout>
</template>
<script>
import Pagination from '../components/Pagination';
import ReadMoreDescription from '../components/ReadMoreDescription';
import { getMetaInfo } from 'pinelab-storefront';
export default {
  components: { ReadMoreDescription, Pagination },
  data() {
    return {
      current: 1,
      itemsPerPage: 24,
      products: [],
      sortedBy: 'price-asc',
      totalProducts: 0,
    };
  },
  created() {
    this.loadFirstPage();
    this.sort(this.sortedBy);
    this.totalProducts = this.$context.products?.length;
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
  metaInfo() {
    const url = `${process.env.GRIDSOME_HOST}${this.$route.fullPath}`;
    return getMetaInfo(this.$context.collection, url);
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
