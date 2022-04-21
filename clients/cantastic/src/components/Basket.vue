<template>
  <span>
    <b-icon icon="basket" size="is-medium"></b-icon>
    <span class="cart-badge">3</span>
  </span>
</template>
<script>
export default {
  mounted() {
    this.$emitter.on('productAdded', this.showAddedBar);
    this.$emitter.on('error', this.showError);
  },
  beforeDestroy() {
    this.$emitter.off('productAdded', this.showAddedBar);
    this.$emitter.off('error', this.showError);
  },
  methods: {
    showAddedBar(event) {
      this.$buefy.snackbar.open({
        message: `${event.quantity} toegevoegd aan winkelmand`,
        position: 'is-top-right',
        type: 'is-light',
        actionText: 'Naar winkelmand',
        onAction: () => {
          this.$router.push('/winkelmand/');
        },
      });
    },
    showError(e) {
      this.$buefy.toast.open({
        message: `Error: ${e?.message}`,
        type: 'is-danger',
      });
    },
  },
};
</script>
<style>
.cart-badge {
  background: black;
  border-radius: 50%;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 12px;
}
</style>
