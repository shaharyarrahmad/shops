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
        </div>
      </template>
    </div>
  </DefaultLayout>
</template>
<script>
import ProductCard from '../components/ProductCard.vue';
export default {
  components: { ProductCard },
};
</script>
