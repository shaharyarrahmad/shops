<template>
  <!------ Cart overview ---->
  <div v-if="activeOrder" class="order-summary p-5">
    <ClientOnly>
      <h4>{{ summaryTitle }}</h4>
      <table style="width: 100%">
        <tbody>
          <tr>
            <td>{{ subtotalLabel }}</td>
            <td class="has-text-right">
              {{ activeOrder.subTotalWithTax | euro }}
            </td>
          </tr>
          <tr>
            <td>{{ shippingLabel }}</td>
            <td class="has-text-right">
              {{ activeOrder.shippingWithTax | euro }}
            </td>
          </tr>
          <tr
            class="has-text-success"
            v-for="discount of activeOrder.discounts"
          >
            <td>{{ discount.description }}</td>
            <td class="has-text-right">{{ discount.amountWithTax | euro }}</td>
          </tr>
        </tbody>
      </table>
      <slot name="middle" />
      <table class="mt-4" style="width: 100%">
        <tbody>
          <tr>
            <td>
              <h5>{{ totalLabel }}:</h5>
            </td>
            <td class="has-text-right">
              <h5>{{ activeOrder.totalWithTax | euro }}</h5>
            </td>
          </tr>
        </tbody>
      </table>
      <slot name="bottom" />
    </ClientOnly>
  </div>
</template>
<script>
import { Store } from '../../vendure/types';

export default {
  props: {
    shippingLabel: {
      default: 'Shipping',
    },
    subtotalLabel: {
      default: 'Subtotal',
    },
    totalLabel: {
      default: 'Total',
    },
    summaryTitle: {
      default: 'Cart',
    },
    activeOrder: Store['activeOrder'],
  },
  computed: {},
};
</script>
<style>
.order-summary {
  border: 1px solid lightgray;
  border-radius: 4px;
}
</style>
