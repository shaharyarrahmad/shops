<template>
  <!------ Cart overview ---->
  <div v-if="order" class="order-summary p-5">
    <ClientOnly>
      <h4>{{ summaryTitle }}</h4>
      <table style="width: 100%">
        <tbody>
          <tr class="has-text-success" v-for="discount of order.discounts">
            <td>{{ discount.description }}</td>
            <td class="has-text-right">{{ discount.amountWithTax | euro }}</td>
          </tr>
          <tr>
            <td>{{ subtotalLabel }}</td>
            <td class="has-text-right">
              {{ order.subTotalWithTax | euro }}
            </td>
          </tr>
          <tr>
            <td>{{ shippingLabel }}</td>
            <td class="has-text-right">
              {{ order.shippingWithTax | euro }}
            </td>
          </tr>
        </tbody>
      </table>
      <slot name="middle" />
      <hr />
      <table class="mt-5" style="width: 100%">
        <tbody>
          <tr>
            <td>
              <h5>{{ totalLabel }}:</h5>
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
    order: Store['activeOrder'],
  },
};
</script>
<style>
.order-summary {
  border: 1px solid lightgray;
  border-radius: 4px;
}
</style>
