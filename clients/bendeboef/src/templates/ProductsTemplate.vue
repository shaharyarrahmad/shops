<template>
  <Layout>
    <div v-for="product of $context.products">
      <!--  <p>{{product.name}}</p>-->
    </div>
  </Layout>
</template>

<script>
export default {
  components: {},
  mounted() {
    console.log(this);
  },
};
</script>
