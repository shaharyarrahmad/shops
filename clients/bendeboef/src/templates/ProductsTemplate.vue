<template>
  <Layout>
    <p>TEST</p>
    <div v-for="product of $context.products">
      <p>{{product.name}}</p>
    </div>
  </Layout>
</template>

<script>
import SfProductCard from "../../storefrontUI/components/components/organisms/SfProductCard/SfProductCard";

export default {
  components: {SfProductCard},
};
</script>
