<template>
  <div>
    <div v-for="product of products">
      {{ product }}
    </div>
  </div>
</template>
<script>
import {ProductDetail} from 'pinelab-storefront-client';
export default {
  mixins: [ProductDetail]
}
</script>