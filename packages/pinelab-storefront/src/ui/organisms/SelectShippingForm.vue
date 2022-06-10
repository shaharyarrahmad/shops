<template>
  <div class="columns">
    <div class="column is-6">
      <section>
        <b-field v-for="method of shippingMethods" :key="method.id">
          <b-radio
            :native-value="method.id"
            v-model="selectedShippingMethod"
            v-on:input="setShippingMethod(method.id)"
          >
            <b>{{ method.name }} ({{ method.priceWithTax | euro }})</b>
            <span
              v-if="
                method.description &&
                method.description.length > 8 &&
                selectedShippingMethod == method.id
              "
              v-html="method.description"
              class="has-text-grey"
            ></span>

            <div v-if="pickupPointSelected" style="margin-left: 31px">
              <PickupPointFinder />
            </div>
          </b-radio>
        </b-field>
      </section>
      <br />
      <div class="columns is-mobile">
        <div class="column">
          <a @click="$emit('back')" class="button is-outlined"><</a>
        </div>
        <div class="column has-text-right">
          <b-button
            type="is-primary"
            icon-left="currency-eur"
            :loading="loadingPayment"
            @click="$emit('submit')"
          >
            {{ submitLabel }}
          </b-button>
        </div>
      </div>
    </div>
    <div class="column is-offset-2 has-text-right">
      <!------ Cart overview ---->
      <div v-if="lines.length > 0">
        {{ cartOverviewLabel }}:
        <table class="table is-fullwidth is-size-7 has-text-right">
          <tbody>
            <tr v-for="line of lines">
              <td>{{ line.quantity }}x {{ line.productVariant.name }}</td>
              <td>{{ line.linePriceWithTax | euro }}</td>
            </tr>
            <tr
              class="has-text-success"
              v-for="discount of activeOrder.discounts"
            >
              <td>{{ discount.description }}</td>
              <td>{{ discount.amountWithTax | euro }}</td>
            </tr>
            <tr>
              <td>{{ shippingLabel }}</td>
              <td>{{ activeOrder.shippingWithTax | euro }}</td>
            </tr>
            <tr>
              <td>
                <b>{{ totalLabel }}:</b>
              </td>
              <td>{{ activeOrder.totalWithTax | euro }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { VendureClient } from '../../vendure/vendure.client';
import { Store } from '../../vendure/types';
import { debounce } from 'debounce';
import PickupPointFinder from '../../../lib/ui/molecules/PickupPointFinder';

export default {
  components: { PickupPointFinder },
  props: {
    shippingLabel: {
      default: 'Shipping',
    },
    totalLabel: {
      default: 'Total',
    },
    cartOverviewLabel: {
      default: 'Cart',
    },
    submitLabel: {
      default: 'Payment',
    },
    shippingMethods: Array,
    vendure: VendureClient,
    store: [Store, Object],
  },
  data() {
    return {
      selectedShippingMethod: undefined,
      loadingPayment: false,
    };
  },
  computed: {
    activeOrder() {
      return this.store?.activeOrder || {};
    },
    lines() {
      return this.store?.activeOrder?.lines || [];
    },
  },
  watch: {
    async pickupPointSelected(newValue) {
      if (newValue) {
        this.postalCode = this.$store?.activeOrder?.shippingAddress?.postalCode;
        await this.getDropOffPoints();
        await this.selectPickupPoint();
      } else {
        await this.unsetPickupPoint();
      }
    },
  },
  created() {
    this.getDropOffPoints = debounce(this.getDropOffPoints, 200);
  },
  methods: {
    async setShippingMethod(methodId) {
      await this.$vendure.setOrderShippingMethod(methodId);
    },
    async getDropOffPoints() {
      try {
        this.loadingDropOffPoints = true;
        this.allPoints = await this.$vendure.getDropOffPoints({
          carrierId: '1',
          postalCode: this.postalCode,
        });
        this.displayedPoints = this.allPoints.slice(0, 3);
        this.loadingDropOffPoints = false;
        await this.selectPickupPoint();
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingDropOffPoints = false;
      }
    },
  },
};
</script>
