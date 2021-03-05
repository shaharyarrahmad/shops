<template>
  <Layout>
    <Cart />
  </Layout>
</template>

<script>
import { Cart } from 'shared-components';
export default {
  components: {
    Cart,
  },
  created() {
    this.$context.previousPage = '/';
    this.$context.hideCartIcon = true;
  },
};
</script>
