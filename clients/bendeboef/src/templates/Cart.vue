<template>
  <Layout #content>
    <CartOverview :active-order="$store.activeOrder"/>
  </Layout>
</template>
<script>
export default {
  async mounted() {
    await this.$vendure.getActiveOrder();
  }
};
</script>