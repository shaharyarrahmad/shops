<template>
  <DefaultLayout>
    <!---- PRODUCT CARD --->
    <div class="columns">
      <template v-for="product of 5">
        <div class="column">
          <ProductCard
            title="Wormenmest verspreider"
            price="14300"
            image="https://storage.googleapis.com/wassets/preview/23/wormenmest-verpreider__preview__preview.png"
          >
          </ProductCard>
          <CategoryCard
            title="Tuinleven"
            image="https://storage.googleapis.com/wassets/preview/f9/garden__preview.jpg"
          >
          </CategoryCard>
        </div>
      </template>
    </div>
  </DefaultLayout>
</template>
<script>
import ProductCard from '../components/ProductCard.vue';
import CategoryCard from '../components/CategoryCard.vue';
export default {
  components: { ProductCard, CategoryCard },
};
</script>
