<template>
  <ClientOnly>
    <div class="container is-max-desktop">
      <b-steps
        v-model="activeStep"
        :animated="true"
        :rounded="true"
        :has-navigation="false"
        label-position="bottom"
        mobile-mode="compact"
      >
        <!--- CUSTOMER DETAILS -------------------------------------->
        <b-step-item
          step="1"
          :label="$l('customer-details.title')"
          icon="account"
          :clickable="true"
        >
          <br />
          <CustomerDetailsForm
            :available-countries="availableCountries"
            :vendure="vendure"
            @back="history.back()"
            @submit="gotToShipping()"
          ></CustomerDetailsForm>
        </b-step-item>

        <!--- SHIPPING -------------------------------------->
        <b-step-item
          step="2"
          :label="$l('shipping.step-title')"
          icon="truck"
          :clickable="false"
        >
          <br />
          <h3>{{ $l('shipping.page-title') }}</h3>
          <div class="columns">
            <div class="column is-6">
              <SelectShippingForm
                :vendure="vendure"
                :store="store"
                :shipping-methods="shippingMethods"
                :pickup-points-enabled="true"
              />
            </div>
            <div class="column is-offset-1">
              <OrderSummary class="mb-5" :order="activeOrder">
                <template #bottom>
                  <br />
                  <b-button
                    class="is-fullwidth"
                    :disable="hasShippingSelected"
                    @click="activeStep = 2"
                  >
                    {{ $l('shipping.submit') }}
                  </b-button>
                </template>
              </OrderSummary>
              <slot name="orderSummaryFooter" />
            </div>
          </div>
        </b-step-item>

        <!--- CHECKUP -------------------------------------->
        <b-step-item
          step="3"
          :label="$l('checkup.title')"
          icon="playlist-check"
          :clickable="false"
          disabled
        >
          <br />
          <div class="columns">
            <div class="column is-6">
              <div class="columns">
                <div class="column">
                  <AddressDisplay
                    :title="$l('checkup.shipping-address')"
                    :address="activeOrder.shippingAddress || {}"
                    :email="
                      activeOrder.customer
                        ? activeOrder.customer.emailAddress
                        : undefined
                    "
                  />
                </div>
                <div
                  class="column"
                  v-if="
                    activeOrder.billingAddress &&
                    activeOrder.billingAddress.postalCode
                  "
                >
                  <AddressDisplay
                    :title="$l('checkup.billingAddress')"
                    :address="activeOrder.billingAddress || {}"
                  />
                </div>
              </div>

              <h4>$l('checkup.items')</h4>
              <div class="scrollable-product-overview">
                <CartItemsTable disabled :active-order="activeOrder" />
              </div>
            </div>
            <div class="column is-5 is-offset-1">
              <OrderSummary class="mb-5" :order="activeOrder">
                <template #bottom>
                  <br />
                  <b-button
                    class="is-fullwidth"
                    :disable="hasShippingSelected"
                    @click="startPayment()"
                  >
                    {{ $l('checkup.pay') }}
                  </b-button>
                  <br />
                  <small>{{ $l('checkup.disclaimer') }}</small>
                </template>
              </OrderSummary>
              <slot name="orderSummaryFooter" />
            </div>
          </div>
        </b-step-item>

        <!--- Order -------------------------------------->
        <b-step-item
          step="4"
          :label="$l('finished.title')"
          icon="check"
          :clickable="false"
          disabled
        >
        </b-step-item>
      </b-steps>
    </div>
  </ClientOnly>
</template>
<script>
import CustomerDetailsForm from '../components/CustomerDetailsForm';
import SelectShippingForm from '../components/SelectShippingForm';
import OrderSummary from '../components/OrderSummary';
import AddressDisplay from '../components/AddressDisplay';
import CartItemsTable from '../components/CartItemsTable';
import { startPayment } from '../util/payment.util';
import { VendureClient } from '../vendure/vendure.client';
import { Store } from '../vendure/types';

export default {
  props: {
    vendure: {
      type: VendureClient,
      required: true,
    },
    store: {
      type: [Store, Object],
      required: true,
    },
    availableCountries: {
      type: Array,
      required: true,
    },
  },
  components: {
    CustomerDetailsForm,
    SelectShippingForm,
    OrderSummary,
    AddressDisplay,
    CartItemsTable,
  },
  computed: {
    activeOrder() {
      return this.store?.activeOrder || {};
    },
    hasShippingSelected() {
      return !!this.store?.activeOrder?.shippingLines?.[0]?.shippingMethod?.id;
    },
  },
  data() {
    return {
      activeStep: 0,
      shippingMethods: [],
      loadingPayment: false,
    };
  },
  methods: {
    async gotToShipping() {
      this.activeStep = 1;
      this.shippingMethods = await this.vendure.getEligibleShippingMethods();
    },
    async startPayment() {
      this.loadingPayment = true;
      try {
        await startPayment(this.vendure, 'mollie');
      } finally {
        this.loadingPayment = false;
      }
    },
  },
};
</script>
<style>
.scrollable-product-overview {
  max-height: 300px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
