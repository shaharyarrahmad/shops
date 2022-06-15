<template>
  <div>
    <ClientOnly>
      <div class="shipping-methods">
        <template v-for="method of shippingMethods">
          <b-field :key="method.id">
            <b-radio
              :native-value="method.id"
              v-model="selectedShippingMethod"
              v-on:input="selectShippingMethod(method.id)"
            >
              <b>{{ method.name }} ({{ method.priceWithTax | euro }})</b>
              <span
                v-if="
                  method.description &&
                  method.description.length > 8 &&
                  selectedShippingMethod === method.id
                "
                v-html="method.description"
                class="has-text-grey"
              ></span>
            </b-radio>
          </b-field>
          <!------------- Pickup points ---------------->
          <PickupPointFinder
            v-if="isPickupPointSelected && selectedShippingMethod === method.id"
            class="mb-4"
            :pickup-points="pickupPoints"
            :loading="loadingPickupPoints"
            :initial-postal-code="postalCode"
            @postal-code-changed="getPickupPoints($event)"
            @pickup-point-selected="setPickupLocationOnOrder($event)"
            style="margin-left: 31px"
          />
        </template>
      </div>
    </ClientOnly>
  </div>
</template>
<script>
import { VendureClient } from '../../vendure/vendure.client';
import { Store } from '../../vendure/types';
import PickupPointFinder from '../molecules/PickupPointFinder';
import debounce from 'debounce';

export default {
  components: { PickupPointFinder },
  props: {
    submitLabel: {
      default: 'Payment',
    },
    shippingMethods: Array,
    vendure: VendureClient,
    store: [Store, Object],
    pickupPointsEnabled: Boolean,
  },
  data() {
    return {
      selectedShippingMethod: undefined,
      loadingPickupPoints: false,
      pickupPoints: [],
    };
  },
  computed: {
    postalCode() {
      return this.store?.activeOrder?.shippingAddress?.postalCode;
    },
    isPickupPointSelected() {
      return (
        this.store?.activeOrder?.shippingLines?.[0]?.shippingMethod?.code?.indexOf(
          'pickup-point'
        ) > -1
      );
    },
  },
  watch: {
    isPickupPointSelected(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.loadingPickupPoints = true;
        this.getPickupPoints();
      }
      if (!newValue && newValue !== oldValue) {
        this.unsetPickupPoint();
      }
    },
    'store.activeOrder': function () {
      this.selectedShippingMethod =
        this.store?.activeOrder?.shippingLines?.[0]?.shippingMethod.id;
    },
  },
  methods: {
    async selectShippingMethod(methodId) {
      await this.vendure.setOrderShippingMethod(methodId);
    },
    async unsetPickupPoint() {
      if (!this.pickupPointsEnabled) {
        return;
      }
      await this.vendure.unsetPickupLocation();
      console.log('Removed pickupLocation from order');
    },
    async getPickupPoints(postalCode) {
      if (!this.pickupPointsEnabled || (!this.postalCode && !postalCode)) {
        return;
      }
      try {
        this.loadingPickupPoints = true;
        this.pickupPoints = await this.vendure.getDropOffPoints({
          carrierId: '1',
          postalCode: postalCode || this.postalCode,
        });
        this.loadingPickupPoints = false;
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingPickupPoints = false;
      }
    },
    async setPickupLocationOnOrder(point) {
      await this.vendure.setPickupLocationOnOrder({
        pickupLocationNumber: String(point.location_code),
        pickupLocationCarrier: String(point.carrier_id),
        pickupLocationName: point.location_name,
        pickupLocationStreet: point.street,
        pickupLocationHouseNumber: `${point.number}${
          point.number_suffix || ''
        }`,
        pickupLocationZipcode: point.postal_code,
        pickupLocationCity: point.city,
        pickupLocationCountry: 'nl', // Only available in NL for now
      });
      console.log(`Selected ${point.location_name} as pickup point`);
    },
  },
  mounted() {
    this.getPickupPoints();
  },
  created() {
    this.getPickupPoints = debounce(this.getPickupPoints, 300);
  },
};
</script>
<style>
.shipping-methods .b-radio.radio {
  align-items: start;
}
</style>
