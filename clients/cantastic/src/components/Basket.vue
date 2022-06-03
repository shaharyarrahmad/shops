<template>
  <span>
    <span class="icon is-large">
      <a @click="sideBasketOpen = true">
        <i class="mdi mdi-basket mdi-48px has-text-white"></i>
      </a>
    </span>
    <span class="cart-badge">{{ nrOfItems }}</span>

    <!-------------------------   Sidemenu ----------------------->
    <ClientOnly>
      <b-sidebar
        type="is-white"
        :fullheight="true"
        :fullwidth="false"
        :overlay="true"
        :right="true"
        v-model="sideBasketOpen"
      >
        <div class="p-2" id="side-basket">
          <div class="has-text-centered mb-2">
            <h3>Winkelmand</h3>
          </div>

          <div class="is-size-7">
            <template v-for="line of lines">
              <img :src="line.featuredAsset.thumbnail" class="is-rounded" />
              <g-link
                :to="`/product/${line.productVariant.product.slug}`"
                class="mb-2"
              >
                {{ line.quantity }}x {{ line.productVariant.name }} <br />
              </g-link>
            </template>
          </div>

          <br />
          <template v-if="lines.length > 0">
            <b-button
              type="is-primary is-outlined is-fullwidth mb-2"
              icon-left="basket"
              tag="a"
              href="/winkelmand/"
            >
              Naar winkelmand
            </b-button>
            <b-button
              type="is-primary is-fullwidth"
              icon-left="run-fast"
              tag="a"
              href="/checkout/"
            >
              Bestellen
            </b-button>
          </template>
        </div>
      </b-sidebar>
    </ClientOnly>
  </span>
</template>
<script>
export default {
  data() {
    return {
      sideBasketOpen: false,
    };
  },
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
      return this.$store?.activeOrder?.lines;
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
#side-basket img {
  width: 50px;
  height: 50px;
}
</style>
