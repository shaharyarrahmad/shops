<template>
  <section>
    <b-steps
      v-model="activeStep"
      :animated="true"
      :rounded="true"
      :has-navigation="true"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      :label-position="labelPosition"
      mobile-mode="compact"
    >
      <b-step-item
        step="1"
        :label="customerDetailsLabel"
        icon="account"
        :clickable="false"
      >
        <br />
        <div class="field is-horizontal is-mobile">
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input" type="text" placeholder="Name" />
                <span class="icon is-small is-left">
                  <i class="mdi mdi-account"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left has-icons-right">
                <input
                  class="input is-success"
                  type="email"
                  placeholder="Email"
                  value="alex@smith.com"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      </b-step-item>

      <b-step-item
        step="2"
        :label="shippingLabel"
        icon="truck"
        :clickable="false"
      >
        shipping
      </b-step-item>

      <b-step-item
        step="3"
        :label="paymentLabel"
        icon="currency-eur"
        :clickable="false"
        disabled
      >
        payments
      </b-step-item>

      <template #navigation="{ previous, next }">
        <b-button
          outlined
          type="is-primary"
          :disabled="previous.disabled"
          @click.prevent="previous.action"
        >
          <
        </b-button>
        <b-button
          outlined
          type="is-primary"
          :disabled="next.disabled"
          @click.prevent="next.action"
        >
          Next
        </b-button>
      </template>
    </b-steps>
  </section>
</template>
<script>
export default {
  props: {
    customerDetailsLabel: { default: 'Customer details' },
    shippingLabel: { default: 'Shipping' },
    paymentLabel: { default: 'Payment' },
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder || {};
    },
  },
  data() {
    return {
      activeStep: 0,
      hasNavigation: true,
      isProfileSuccess: false,

      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      labelPosition: 'bottom',
    };
  },
  methods: {},
  async mounted() {
    await this.$vendure.getActiveOrder();
    if (!this.$store.activeOrder) {
      await this.$router.push('/');
    }
  },
};
</script>
<style></style>
