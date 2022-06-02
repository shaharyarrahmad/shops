<template>
  <div class="box mb-2" :style="`background-color: ${bgColor};`">
    <div class="columns is-mobile">
      <div
        class="column is-size-7 pl-4 pr-0 pt-1 pb-0"
        :style="`color: ${textColor};`"
      >
        {{ variant.options[0].name }}
      </div>
      <div class="column p-0">
        <b-numberinput
          size="is-small"
          v-on:input="buy()"
          v-model="displayQuantity"
          :loading="isLoading"
          tabindex="1"
        >
        </b-numberinput>
      </div>
    </div>
  </div>
</template>
<script>
import { buy } from 'pinelab-storefront-client';
import debounce from 'debounce';

export default {
  props: ['variant', 'bgColor', 'textColor'],
  data() {
    return {
      isLoading: false,
      orderLine: undefined,
      displayQuantity: 0,
    };
  },
  watch: {
    '$store.activeOrder': function (order) {
      this.orderLine = order.lines.find(
        (line) => line.productVariant.id === this.variant.id
      );
      this.displayQuantity = this.orderLine?.quantity || 0;
    },
  },
  methods: {
    async buy() {
      try {
        this.isLoading = true;
        if (!this.orderLine) {
          // Buy because no existing orderLine
          await buy(
            this.variant,
            {
              vendure: this.$vendure,
              emitter: this.$emitter,
            },
            this.displayQuantity
          );
        } else {
          // Adjust existing orderline
          const quantityAdded = this.displayQuantity - this.orderLine.quantity;
          await this.$vendure.adjustOrderLine(
            this.orderLine.id,
            this.displayQuantity
          );
          this.$emitter.emit('productAdded', {
            variantId: this.variant.id,
            quantity: quantityAdded,
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.buy = debounce(this.buy, 500);
  },
};
</script>
<style></style>
