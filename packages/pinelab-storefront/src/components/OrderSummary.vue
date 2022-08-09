<template>
  <!------ Cart overview ---->
  <div v-if="order" class="order-summary p-5">
    <ClientOnly>
      <h4>{{ $l('order-summary.title') }}</h4>
      <table style="width: 100%">
        <tbody>
          <tr>
            <td>{{ $l('order-summary.subtotal') }}</td>
            <td class="has-text-right">
              {{ subTotalWithTax | euro }}
            </td>
          </tr>
          <tr v-for="shippingLine of shippingLines">
            <td>{{ $l('order-summary.shipping-cost') }}</td>
            <td class="has-text-right">
              {{ shippingLine.priceWithTax | euro }}
            </td>
          </tr>
          <tr class="has-text-success" v-for="discount of order.discounts">
            <td>{{ discount.description }}</td>
            <td class="has-text-right">{{ discount.amountWithTax | euro }}</td>
          </tr>
        </tbody>
      </table>
      <slot name="middle" />
      <hr />
      <table class="mt-5" style="width: 100%">
        <tbody>
          <tr>
            <td>
              <h5>{{ $l('order-summary.total') }}:</h5>
            </td>
            <td class="has-text-right">
              <h5>{{ order.totalWithTax | euro }}</h5>
            </td>
          </tr>
        </tbody>
      </table>
      <slot name="bottom" />
    </ClientOnly>
  </div>
</template>
<script>
import { Store } from '../vendure/types';

export default {
  props: {
    order: {
      type: Store['activeOrder'],
      required: true,
    },
  },
  computed: {
    shippingLines() {
      return this.order?.shippingLines || [];
    },
    subTotalWithTax() {
      return (
        this.order?.lines?.reduce(
          (acc, current) => acc + current.linePriceWithTax,
          0
        ) || 0
      );
    },
  },
};
</script>
<style>
.order-summary {
  border: 1px solid lightgray;
  border-radius: 4px;
}
</style>
