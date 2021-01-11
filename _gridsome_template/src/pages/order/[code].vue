<template>
  <Layout>
    <Order/>
  </Layout>
</template>

<script>
import {Order} from 'shared-components';

export default {
  components: {
    Order
  },
  created () {
    this.$context.previousPage = '/'
    this.$context.hideCartIcon = true;
  }
}
</script>