<template>
  <div>
    <div v-for="product of $context.products">
      {{ product }}
    </div>
  </div>
</template>
<script lang="ts">
import {ProductMixin} from 'pinelab-storefront-client'
import Component from 'vue-class-component'

// Extending the Super class component
@Component
export default class HelloWorld extends ProductMixin {
  created() {

    console.log(this.$context) // -> Hello
  }
}

/*export default {
  mounted() {
    console.log('mounted from products', this);
  }
}*/
</script>