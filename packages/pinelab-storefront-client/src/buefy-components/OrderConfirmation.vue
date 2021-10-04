<template>
  <div class="container is-max-desktop has-text-centered">
    <b-steps
      v-model="activeStep"
      :animated="true"
      :rounded="true"
      :has-navigation="false"
      label-position="bottom"
      mobile-mode="compact"
    >
      <b-step-item step="1" icon="account" :clickable="false"> </b-step-item>
      <b-step-item step="2" icon="truck" :clickable="false"> </b-step-item>
      <b-step-item step="3" icon="currency-eur" :clickable="false" disabled>
      </b-step-item>
      <b-step-item
        step="4"
        :label="succesLabel"
        icon="check"
        :clickable="false"
        disabled
      >
      </b-step-item>
    </b-steps>

    <p v-if="!order && !error">Loading...</p>

    <b-notification v-else-if="error" class="is-danger">
      {{ error }}
    </b-notification>

    <div v-else>
      <p v-html="message"></p>
      <br />
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>{{ itemLabel }}</th>
            <th>{{ quantityLabel }}</th>
            <th>{{ totalLabel }}</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>{{ shippingLabel }}</th>
            <th></th>
            <th>{{ order.shippingWithTax | euro }}</th>
          </tr>
          <tr v-for="(total, rate) in taxLines">
            <td>{{ taxLabel }}</td>
            <td>{{ rate }} %</td>
            <td :id="`tax-${rate}-amount`">{{ total | euro}}</td>
          </tr>
          <tr>
            <th>{{ totalLabel }}</th>
            <th></th>
            <th>{{ order.totalWithTax | euro }}</th>
          </tr>
        </tfoot>
        <tbody>
          <tr v-for="line in order.lines">
            <td>{{ line.productVariant.product.name }}</td>
            <td>{{ line.quantity }}</td>
            <td>{{ line.linePriceWithTax | euro }}</td>
          </tr>
          <tr><td>&NonBreakingSpace;</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      default:
        'This is what you ordered. You will receive a confirmation in your email.',
    },
    itemLabel: { default: 'Item' },
    quantityLabel: { default: 'Quantity' },
    totalLabel: { default: 'Total' },
    succesLabel: { default: 'Success!' },
    shippingLabel: { default: 'Shipping' },
    taxLabel: { default: 'Tax' },
  },
  data() {
    return {
      order: undefined,
      error: undefined,
      activeStep: 4,
      taxLines: {}
    };
  },
  async mounted() {
    const { code } = this.$route.params;
    let pollingCount = 0;
    try {
      while (this.order?.state !== 'PaymentSettled') {
        if (pollingCount > 10) {
          this.error = 'Something is wrong, please contact us...';
          break;
        }
        this.order = await this.$vendure.getOrderByCode(code);
        console.log(this.order?.state);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        pollingCount++;
        console.log(`Polling for payment status ${pollingCount}`);
      }
      this.order.taxSummary.forEach(line => {
        const total = this.taxLines[line.taxRate] || 0;
        this.taxLines[line.taxRate] = total + line.taxTotal
      })
    } catch (e) {
      console.error(e);
      this.error = `Something is wrong, please contact us. ${e?.response?.errors?.[0]?.message}`;
    }
  },
};
</script>
