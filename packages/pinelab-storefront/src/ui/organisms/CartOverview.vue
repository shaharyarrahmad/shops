<template>
  <ClientOnly>
    <div>
      <div v-if="lines.length > 0">
        <div class="has-text-right">
          <g-link :to="linkToCheckout" class="button is-primary"
            >{{ checkoutButtonLabel }}
          </g-link>
        </div>
        <br />
        <p class="has-text-right">
          <strong>{{ totalLabel }}:</strong>
          {{ activeOrder.totalWithTax | euro }}
        </p>
        <br />
        <div class="columns">
          <div class="column is-half is-offset-half">
            <b-field :type="couponClass">
              <b-input
                v-on:input="applyCouponCode()"
                :placeholder="couponLabel"
                icon="check-decagram"
                :loading="loadingCoupon"
                v-model="couponCode"
              />
            </b-field>
          </div>
        </div>
        <table class="table order-table is-fullwidth is-striped">
          <tbody>
            <tr v-for="line of lines">
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
            <tr
              class="has-text-success"
              v-for="discount of activeOrder.discounts"
            >
              <td class="is-hidden-mobile"></td>
              <td colspan="2">
                <p>{{ discount.description }}</p>
              </td>
              <td class="has-text-right nowrap">
                <p>{{ discount.amountWithTax | euro }}</p>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div class="has-text-right">
          <g-link :to="linkToCheckout" class="button is-primary"
            >{{ checkoutButtonLabel }}
          </g-link>
        </div>
      </div>
      <div v-else v-html="emptyCartLabel"></div>
    </div>
  </ClientOnly>
</template>
<script>
import { debounce } from 'debounce';

export default {
  props: {
    emptyCartLabel: {
      required: true,
    },
    checkoutButtonLabel: {
      type: String,
      default: 'Order now',
    },
    linkToCheckout: {
      type: String,
      required: true,
    },
    totalLabel: {
      type: String,
      default: 'Total',
    },
    couponLabel: {
      type: String,
      default: 'Coupon code',
    },
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder || {};
    },
    lines() {
      return this.$store?.activeOrder?.lines || [];
    },
    hasCoupon() {
      return this.$store?.activeOrder?.couponCodes?.length > 0;
    },
    couponClass() {
      if (this.isInvalidCoupon) {
        return 'is-danger';
      } else if (this.hasCoupon) {
        return 'is-success';
      }
    },
  },
  data() {
    return {
      couponCode: undefined,
      isInvalidCoupon: false,
      loadingCoupon: false,
    };
  },
  methods: {
    async remove(lineId) {
      await this.$vendure.adjustOrderLine(lineId, 0);
    },
    async applyCouponCode() {
      try {
        this.loadingCoupon = true;
        await Promise.all(
          this.activeOrder.couponCodes.map((code) =>
            this.$vendure.removeCouponCode(code)
          )
        );
        await this.$vendure.applyCouponCode(this.couponCode);
        this.isInvalidCoupon = false;
      } catch (error) {
        console.warn(error);
        this.isInvalidCoupon = true;
      } finally {
        this.loadingCoupon = false;
      }
    },
    getThumbnail(asset) {
      return asset?.thumbnail;
    },
  },
  created() {
    this.applyCouponCode = debounce(this.applyCouponCode, 500);
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
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
