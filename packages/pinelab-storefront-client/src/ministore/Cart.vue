<template>
  <ClientOnly>
    <div>
      <div v-if="orderLines > 0">
        <div class="grid-x grid-padding-x text-right small-font">
          <div class="cell small-6"></div>
          <div class="cell small-6">
            <label>
              Coupon
              <input
                type="text"
                name="couponCode"
                :class="{ 'is-invalid-input': isInvalidCoupon }"
                style="margin-bottom: 0"
                v-on:input="applyCouponCode()"
                v-model="couponCode"
              />
              <span
                v-if="activeOrder.discounts"
                v-for="discount of activeOrder.discounts"
                class="success"
              >
                {{ discount.description }}
              </span>
            </label>
          </div>
        </div>
        <br />

        <div
          class="
            grid-x
            small-up-2
            medium-up-2
            large-up-2
            grid-padding-x
            text-right
            small-font
          "
        >
          <div class="cell">
            <p>Totaal:</p>
          </div>
          <div class="cell">
            <strong> {{ activeOrder.totalWithTax | euro }}</strong>
          </div>
        </div>

        <div
          v-for="(line, i) in activeOrder.lines"
          class="grid-x small-font"
          :class="i % 2 === 0 ? 'accent-row' : ''"
          style="padding: 10px"
        >
          <div class="cell small-4 medium-3 large-2">
            <div class="product-thumbnail">
              <img
                :src="getPreview(line.featuredAsset)"
                :alt="line.productVariant.name"
              />
            </div>
          </div>
          <div class="cell small-8 medium-9 large-10 text-right cart-details">
            <p class="cart-name">{{ line.productVariant.product.name }}</p>
            <span
              v-if="
                line.productVariant.name !== line.productVariant.product.name
              "
            >
              {{ line.productVariant.name }}&nbsp;</span
            >
            <span class="cart-price">{{
              line.productVariant.priceWithTax | euro
            }}</span>
            <NumberInput
              :value="line.quantity"
              v-on:numberChange="updateQuantity(line.id, $event)"
            />
          </div>
        </div>

        <div
          class="
            grid-x
            small-up-2
            medium-up-2
            large-up-2
            grid-padding-x
            text-right
            small-font
          "
          style="padding-top: 40px"
        >
          <template
            v-if="activeOrder.discounts"
            v-for="discount of activeOrder.discounts"
          >
            <div class="cell">
              <p class="success">{{ discount.description }}</p>
            </div>
            <div class="cell success">
              <p>{{ discount.amountWithTax | euro }}</p>
            </div>
          </template>
          <div class="cell">
            <p>Subtotaal:</p>
          </div>
          <div class="cell">
            <p>{{ activeOrder.subTotalWithTax | euro }}</p>
          </div>
          <div class="cell">
            <p>Verzendkosten:</p>
          </div>
          <div class="cell">
            <p>{{ activeOrder.shippingWithTax | euro }}</p>
          </div>
          <div class="cell">
            <p>Totaal:</p>
          </div>
          <div class="cell">
            <strong> {{ activeOrder.totalWithTax | euro }}</strong>
          </div>
          <div class="cell"></div>
          <div class="cell">
            <g-link class="button" to="/customer-details/"> BESTEL</g-link>
          </div>
        </div>
      </div>
      <div v-if="!orderLines">
        <div class="grid-x small-up-1grid-padding-x text-center small-font">
          <div class="cell">
            <p>Je hebt nog niks in je winkelmand...</p>
            <img
              src="https://storage.googleapis.com/pinelab-shops-assets/angular-assets/mand.jpg"
              alt="Korter"
            />
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
<script>
import NumberInput from './NumberInput';
import { debounce } from 'debounce';

export default {
  components: {
    NumberInput,
  },
  data() {
    return {
      isInvalidCoupon: false,
      couponCode: undefined,
    };
  },
  methods: {
    getPreview(asset) {
      return asset?.thumbnail;
    },
    updateQuantity(lineId, q) {
      this.$vendure.adjustOrderLine(lineId, q);
    },
    async applyCouponCode() {
      try {
        await this.$vendure.applyCouponCode(this.couponCode);
        this.isInvalidCoupon = false;
      } catch (error) {
        console.warn(error);
        this.isInvalidCoupon = true;
        this.activeOrder.couponCodes.forEach((code) =>
          this.$vendure.removeCouponCode(code)
        );
      }
    },
  },
  created() {
    this.applyCouponCode = debounce(this.applyCouponCode, 1000);
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder || {};
    },
    orderLines() {
      return this.activeOrder?.lines?.length;
    },
  },
};
</script>
