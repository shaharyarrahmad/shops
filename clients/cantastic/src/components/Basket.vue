<template>
  <b-tooltip
    position="is-bottom"
    multilined
    type="is-info"
    :auto-close="['escape', 'outside']"
  >
    <g-link to="/winkelmand/">
      <span>
        <b-icon icon="basket" size="is-large"></b-icon>
        <span class="cart-badge">{{ nrOfItems }}</span>
      </span>
    </g-link>
    <template v-slot:content>
      <b>Totaal: {{ price }}</b> <br />
      <template v-for="{ name, quantity } of lines">
        {{ quantity }}x {{ name }} <br />
      </template>
      <template v-if="lines.length > 0">
        <br />
        <b-button type="is-light" tag="a" href="/winkelmand/">
          € Naar winkelmand
        </b-button>
        <br />
      </template>
      <br />
    </template>
  </b-tooltip>
</template>
<script>
export default {
  async mounted() {
    this.$emitter.on('productAdded', this.showNotificationBar);
    this.$emitter.on('error', this.showError);
    await this.$vendure.getActiveOrder();
  },
  beforeDestroy() {
    this.$emitter.off('productAdded', this.showNotificationBar);
    this.$emitter.off('error', this.showError);
  },
  computed: {
    nrOfItems() {
      if (this.$store?.activeOrder?.lines?.length === 0) {
        return 0;
      }
      return (
        this.$store?.activeOrder?.lines
          ?.map((l) => l.quantity)
          ?.reduce((quantity1, quantity2) => quantity1 + quantity2) || 0
      );
    },
    lines() {
      const lines = {};
      this.$store?.activeOrder?.lines.forEach((line) => {
        const product = line.productVariant.product;
        const existing = lines[product.name] || 0;
        lines[product.name] = existing + line.quantity;
      });

      return Object.entries(lines).map(([name, quantity]) => ({
        name,
        quantity,
      }));
    },
    price() {
      return this.$root.$options.filters.euro(
        this.$store?.activeOrder?.totalWithTax
      );
    },
  },
  methods: {
    showNotificationBar(event) {
      const message =
        event.quantity > 0
          ? `${event.quantity} toegevoegd aan winkelmand`
          : `${event.quantity * -1} verwijderd uit winkelmand`;
      this.$buefy.snackbar.open({
        message,
        position: 'is-top-right',
        type: 'is-light',
        actionText: 'Naar winkelmand',
        pauseOnHover: true,
        duration: 5000,
        onAction: () => {
          this.$router.push('/winkelmand/');
        },
      });
    },
    showError(e) {
      this.$buefy.toast.open({
        message: `Error: ${e?.message}`,
        duration: 5000,
        type: 'is-info',
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
  color: white;
}
</style>
