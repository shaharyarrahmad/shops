<template>
  <Layout>
    <p>TEST</p>
    <div v-for="product of $context.products">
      <p>{{product.name}}</p>
    </div>
  </Layout>
</template>

<script>
export default {
  components: {},
};
</script>
