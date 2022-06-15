<template>
  <div>
    <b-field :type="couponClass">
      <b-input
        v-on:input="applyCouponCode"
        :placeholder="couponLabel"
        icon="ticket-percent"
        :loading="loading"
        v-model="couponCode"
      />
    </b-field>
    <template v-for="coupon of appliedCoupons">
      <b-button
        size="is-small"
        outlined
        class="mr-1 has-text-weight-normal"
        icon-right="close-circle"
        @click="removeCoupon(coupon)"
      >
        {{ coupon }}
      </b-button>
    </template>
  </div>
</template>
<script>
import { VendureClient } from '../../vendure/vendure.client';
import { debounce } from 'debounce';

export default {
  props: {
    vendure: VendureClient,
    appliedCoupons: Array,
    couponLabel: String,
  },
  computed: {
    couponClass() {
      if (this.isInvalid) {
        return 'is-danger';
      } else if (this.isApplied) {
        return 'is-success';
      }
    },
  },
  data() {
    return {
      couponCode: undefined,
      loading: false,
      isApplied: false,
      isInvalid: false,
    };
  },
  methods: {
    async applyCouponCode() {
      try {
        this.loading = true;
        await this.vendure.applyCouponCode(this.couponCode);
        this.isInvalid = false;
        this.isApplied = true;
      } catch (error) {
        console.warn(error);
        this.isInvalid = true;
      } finally {
        this.loading = false;
      }
    },
    async removeCoupon(coupon) {
      await this.vendure.removeCouponCode(coupon);
    },
  },
  created() {
    this.applyCouponCode = debounce(this.applyCouponCode, 500);
  },
};
</script>
