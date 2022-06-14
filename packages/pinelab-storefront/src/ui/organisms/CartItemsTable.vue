<template>
  <ClientOnly>
    <div>
      <div
        v-if="activeOrder && activeOrder.lines && activeOrder.lines.length > 0"
      >
        <table class="table order-table is-fullwidth is-striped">
          <tbody>
            <tr v-for="line of activeOrder.lines">
              <td class="image-column is-hidden-mobile">
                <img
                  v-if="getThumbnail(line.featuredAsset)"
                  :src="getThumbnail(line.featuredAsset)"
                  :alt="`${line.productVariant.name} thumbnail`"
                />
              </td>
              <td>
                <p class="is-hidden-mobile">
                  <strong>{{ line.productVariant.product.name }}</strong>
                </p>
                <p class="has-text-grey">{{ line.productVariant.name }}</p>
              </td>
              <td class="quantity-column">
                <b-field>
                  <QuantityInput :value="line.quantity" :line-id="line.id" />
                </b-field>
              </td>
              <td class="has-text-right">
                <p>{{ line.linePriceWithTax | euro }}</p>
              </td>
              <td class="has-text-right" style="padding-right: 0">
                <b-button
                  type="is-outlined is-small"
                  @click="remove(line.id)"
                  icon-right="close"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </ClientOnly>
</template>
<script>
import { debounce } from 'debounce';
import { Store } from '../../vendure/types';
import { VendureClient } from '../../vendure/vendure.client';

export default {
  props: {
    activeOrder: Store['activeOrder'],
    vendure: VendureClient,
  },
  computed: {},
  data() {
    return {
      couponCode: undefined,
      isInvalidCoupon: false,
      loadingCoupon: false,
    };
  },
  methods: {
    async remove(lineId) {
      await this.vendure.adjustOrderLine(lineId, 0);
    },
    getThumbnail(asset) {
      return asset?.thumbnail;
    },
  },
  created() {
    this.applyCouponCode = debounce(this.applyCouponCode, 500);
  },
  async mounted() {
    this.couponCode = this.activeOrder?.couponCodes?.[0];
  },
};
</script>
<style>
.order-table td {
  padding-left: 0;
}

.image-column {
  width: 64px;
}

.quantity-column {
  width: 140px;
  min-width: 140px;
}

.nowrap {
  white-space: nowrap;
}
</style>
