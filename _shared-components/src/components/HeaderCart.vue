<template>
  <p>{{ activeOrder }}</p>
</template>

<script>

export default {
  data() {
    return {
      activeOrder: this.$cart.activeOrder,
    }
  },
  watch: {
    activeOrder(newVal, oldVal) { // watch it
      console.log('cart change', newVal)
    }
  },
  methods: {
  },
  async mounted() {
    console.log('current cart', this.$cart)
  }
}
</script>