<template>
  <div>
    <div v-if="lines.length > 0">
      <div class="has-text-right">
        <g-link :to="linkToCheckout" class="button is-primary">{{ checkoutButtonText }}</g-link>
      </div>
      <br>
      <p class="has-text-right"><strong>{{ totalText }}:</strong> {{ activeOrder.totalWithTax | euro }}</p>
      <br>
      <table class="table order-table is-fullwidth is-striped">
        <tbody>
        <tr v-for="line of lines">
          <td class="image-column is-hidden-mobile">
            <img :src="line.featuredAsset.thumbnail" :alt="`${line.productVariant.name} thumbnail`" />
          </td>
          <td>
            <p>
              <strong>{{ line.productVariant.product.name }}</strong>
              <br>
              <span class="has-text-grey">{{ line.productVariant.name }}</span>
            </p>
          </td>
          <td class="quantity-column">
            <b-field>
              <QuantityInput
                :value="line.quantity"
                :line-id="line.id"
              />
            </b-field>
          </td>
          <td class="has-text-right">
            <p>{{ line.linePriceWithTax | euro }}</p>
          </td>
          <td class="has-text-right" style="padding-right: 0;">
            <b-button type="is-primary is-small"
                      @click="remove(line.id)"
                      icon-right="delete" />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else v-html="emptyCartText"></div>
  </div>
</template>
<script>

export default {
  props: {
    emptyCartText: {
      required: true
    },
    checkoutButtonText: {
      type: String,
      required: true
    },
    linkToCheckout: {
      type: String,
      required: true
    },
    totalText: {
      type: String,
      default: 'Total'
    }
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder || {}
    },
    lines() {
      return this.$store?.activeOrder?.lines || [];
    }
  },
  methods: {
    async remove(lineId) {
      await this.$vendure.adjustOrderLine(lineId, 0);
    }
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
  }
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
  width: 150px;
  min-width: 150px;
}
</style>
