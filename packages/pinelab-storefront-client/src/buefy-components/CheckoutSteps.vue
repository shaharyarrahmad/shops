<template>
  <section class="container is-max-desktop">
    <ClientOnly>
      <b-steps
        v-model="activeStep"
        :animated="true"
        :rounded="true"
        :has-navigation="false"
        label-position="bottom"
        mobile-mode="compact"
      >
        <!--- CUSTOMER DETAILS -------------------------------------->
        <b-step-item
          step="1"
          :label="customerDetailsLabel"
          icon="account"
          :clickable="false"
        >
          <br />
          <form v-on:submit="setCustomerDetails($event)">
            <div class="columns">
              <div class="column">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <b-input
                      :placeholder="companyLabel"
                      type="text"
                      v-model="address.company"
                    />
                    <span class="icon is-small is-left">
                      <i class="mdi mdi-office-building"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <b-input
                      :placeholder="`${firstnameLabel}*`"
                      type="text"
                      required
                      v-model="customer.firstName"
                    />
                    <span class="icon is-small is-left">
                      <i class="mdi mdi-account"></i>
                    </span>
                  </p>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <b-input
                      :placeholder="`${lastnameLabel}*`"
                      type="text"
                      required
                      v-model="customer.lastName"
                    />
                    <span class="icon is-small is-left">
                      <i class="mdi mdi-account"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <b-input
                      :placeholder="phoneLabel"
                      type="text"
                      v-model="customer.phoneNumber"
                    />
                    <span class="icon is-small is-left">
                      <i class="mdi mdi-cellphone-basic"></i>
                    </span>
                  </p>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <b-input
                      :placeholder="`${emailLabel}*`"
                      type="text"
                      required
                      v-model="customer.emailAddress"
                    />
                    <span class="icon is-small is-left">
                      <i class="mdi mdi-email"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="columns is-mobile">
              <div class="column">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <b-input
                      :placeholder="`${postalCodeLabel}*`"
                      type="text"
                      required
                      v-model="address.postalCode"
                      v-on:input="getAddress()"
                    />
                    <span class="icon is-small is-left">
                      <i class="mdi mdi-mailbox"></i>
                    </span>
                  </p>
                </div>
              </div>
              <div class="column is-narrow">
                <div class="field is-small-field">
                  <p class="control is-expanded has-icons-left">
                    <b-input
                      :placeholder="`${houseNumberLabel}*`"
                      type="text"
                      required
                      v-model="address.streetLine2"
                      v-on:input="getAddress()"
                    />
                    <span class="icon is-small is-left">
                      <i class="mdi mdi-home"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <b-input
                      :placeholder="`${streetLabel}*`"
                      type="text"
                      required
                      v-model="address.streetLine1"
                    />
                    <span class="icon is-small is-left">
                      <i class="mdi mdi-home"></i>
                    </span>
                  </p>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <b-input
                      :placeholder="`${cityLabel}*`"
                      type="text"
                      required
                      v-model="address.city"
                    />
                    <span class="icon is-small is-left">
                      <i class="mdi mdi-city"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <b-field>
              <b-select
                :placeholder="countryLabel"
                name="country"
                icon="earth"
                v-model="address.countryCode"
              >
                <option
                  v-for="country of availableCountries"
                  :key="country.code"
                  :value="country.code"
                >
                  {{ country.name }}
                </option>
              </b-select>
            </b-field>

            <div class="columns is-mobile">
              <div class="column">
                <a @click="goBack()" class="button is-outlined"><</a>
              </div>
              <div class="column has-text-right">
                <button
                  type="submit"
                  class="button is-primary"
                  :disabled="loadingShipping"
                >
                  {{ shippingLabel }} >
                </button>
              </div>
            </div>
          </form>
        </b-step-item>

        <!--- SHIPPING -------------------------------------->
        <b-step-item
          step="2"
          :label="shippingLabel"
          icon="truck"
          :clickable="false"
        >
          <br />
          <div class="columns">
            <div class="column is-half is-offset-one-quarter">
              <section>
                <b-field v-for="method of shippingMethods" :key="method.id">
                  <b-radio
                    :native-value="method.id"
                    v-model="selectedShippingMethod"
                    v-on:input="setShippingMethod(method.id)"
                  >
                    {{ method.name }} ({{ method.priceWithTax | euro }})
                  </b-radio>
                </b-field>
              </section>
              <br />

              <p>
                {{ totalLabel }}:
                <strong>{{ activeOrder.totalWithTax | euro }}</strong>
              </p>
              <br />
              <div class="columns is-mobile">
                <div class="column">
                  <a @click="goBack()" class="button is-outlined"><</a>
                </div>
                <div class="column has-text-right">
                  <b-button
                    type="is-primary"
                    icon-left="currency-eur"
                    :loading="loadingPayment"
                    @click="choosePayment($event)"
                  >
                    {{ paymentLabel }}
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </b-step-item>

        <!--- PAYMENT -------------------------------------->
        <b-step-item
          step="3"
          :label="paymentLabel"
          icon="currency-eur"
          :clickable="false"
          disabled
        >
          <br />
          <div class="columns">
            <div class="column is-offset-one-quarter">
              <h5>{{ paymentMethodLabel }}</h5>
              <br />
              <section>
                <b-field>
                  <b-radio
                    v-model="selectedPaymentMethod"
                    native-value="mollie"
                  >
                    <slot name="mollie">Mollie (iDeal, Creditcard)</slot>
                  </b-radio>
                </b-field>
                <b-field>
                  <b-radio
                    v-model="selectedPaymentMethod"
                    native-value="coinbase"
                  >
                    <slot name="coinbase"
                      >Coinbase (Bitcoin, Ethereum, Litecoin and more)</slot
                    >
                  </b-radio>
                </b-field>
              </section>
              <br />
              <p>
                {{ totalLabel }}:
                <strong>{{ activeOrder.totalWithTax | euro }}</strong>
              </p>
              <br />
              <div class="columns is-mobile">
                <div class="column">
                  <a @click="goBack()" class="button is-outlined"><</a>
                </div>
                <div class="column">
                  <b-button
                    type="is-primary"
                    icon-left="currency-eur"
                    :loading="loadingPayment"
                    @click="pay($event, selectedPaymentMethod)"
                  >
                    {{ paymentLabel }}
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </b-step-item>

        <!--- Order -------------------------------------->
        <b-step-item
          step="4"
          :label="succesLabel"
          icon="check"
          :clickable="false"
          disabled
        >
        </b-step-item>
      </b-steps>
    </ClientOnly>
  </section>
</template>
<script>
import { debounce } from 'debounce';
import PopupImage from '../../lib/buefy-components/PopupImage';

export default {
  components: { PopupImage },
  props: {
    previousPage: { required: true },
    customerDetailsLabel: { default: 'Customer details' },
    shippingLabel: { default: 'Shipping' },
    paymentLabel: { default: 'Payment' },
    companyLabel: { default: 'Company' },
    firstnameLabel: { default: 'Firstname' },
    lastnameLabel: { default: 'Lastname' },
    phoneLabel: { default: 'Phonenumber' },
    emailLabel: { default: 'Emailaddress' },
    cityLabel: { default: 'City' },
    postalCodeLabel: { default: 'Postalcode' },
    streetLabel: { default: 'Street' },
    houseNumberLabel: { default: 'HouseNr' },
    countryLabel: { default: 'Country' },
    totalLabel: { default: 'Total' },
    succesLabel: { default: 'Success!' },
    paymentMethodLabel: { default: 'How would you like to pay?' },
    availableCountries: {
      type: Array,
      default() {
        return [{ name: 'Nederland', code: 'nl' }];
      },
    },
    paymentMethods: {
      type: Array,
      validator(values) {
        // The values must match one of these strings
        return values.every((value) => ['mollie', 'coinbase'].includes(value));
      },
      default() {
        return ['mollie'];
      },
    },
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder || {};
    },
  },
  data() {
    return {
      loadingShipping: false,
      loadingPayment: false,
      activeStep: 0,
      customer: {
        emailAddress: undefined,
        firstName: undefined,
        lastName: undefined,
        phoneNumber: undefined,
      },
      address: {
        company: undefined,
        city: undefined,
        streetLine1: undefined,
        streetLine2: undefined,
        postalCode: undefined,
        countryCode: 'nl',
      },
      shippingMethods: [],
      selectedShippingMethod: undefined,
      selectedPaymentMethod: 'mollie',
    };
  },
  methods: {
    async setCustomerDetails(e) {
      e.preventDefault();
      this.loadingShipping = true;
      const address = {
        ...this.address,
        fullName: `${this.customer.firstName} ${this.customer.lastName}`,
        defaultBillingAddress: true,
        defaultShippingAddress: true,
        phoneNumber: this.customer.phoneNumber,
      };
      try {
        await this.$vendure.setCustomerForOrder(this.customer);
        await this.$vendure.setOrderShippingAddress(address);
        await this.$vendure.setLowestShippingMethod();
        // Get latest eligible shippingmethods
        this.shippingMethods = await this.$vendure.getEligibleShippingMethods();
        this.selectedShippingMethod =
          this.$store?.activeOrder?.shippingLines?.[0]?.shippingMethod.id;
      } catch (e) {
        console.error(e);
        this.showError();
      } finally {
        this.loadingShipping = false;
      }
      this.activeStep = 1;
    },
    async choosePayment(e) {
      if (this.paymentMethods.length > 1) {
        this.activeStep = 2;
      } else {
        await this.pay(e, 'mollie');
      }
    },
    async pay(e, method) {
      try {
        e.preventDefault();
        this.loadingPayment = true;
        if (method === 'mollie') {
          const redirectUrl = await this.$vendure.createMolliePaymentIntent(
            `mollie-payment-${process.env.GRIDSOME_VENDURE_TOKEN}`
          );
          window.location.replace(redirectUrl);
        } else if (method === 'coinbase') {
          const redirectUrl = await this.$vendure.createCoinbasePaymentIntent();
          window.location.replace(redirectUrl);
        } else {
          console.error(`${method} is not a valid payment method!`);
          this.showError();
        }
      } catch (e) {
        console.error(e);
        this.showError();
      } finally {
        this.loadingShipping = false;
      }
    },
    showError() {
      this.$buefy.toast.open({
        message: `Something went wrong...`,
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
    goBack() {
      if (this.activeStep === 0) {
        this.$router.push(this.previousPage);
      }
      this.activeStep -= 1;
    },
    async setShippingMethod(methodId) {
      await this.$vendure.setOrderShippingMethod(methodId);
    },
    async getAddress() {
      if (this.address?.postalCode?.length < 6 || !this.address?.streetLine2) {
        return;
      }
      const address = await this.$vendure.getAddress({
        postalCode: this.address.postalCode,
        houseNumber: this.address.streetLine2,
      });
      if (address && address.street) {
        this.address.streetLine1 = address.street;
        this.address.city = address.city;
        this.address.countryCode = 'nl';
      }
    },
  },
  async mounted() {
    const activeOrder = await this.$vendure.getActiveOrder();
    if (!this.$store.activeOrder) {
      await this.$router.push('/');
    }
    // Set Customer, if already set on order
    this.customer.firstName = activeOrder?.customer?.firstName;
    this.customer.lastName = activeOrder?.customer?.lastName;
    this.customer.phoneNumber = activeOrder?.customer?.phoneNumber;
    this.customer.emailAddress = activeOrder?.customer?.emailAddress;
    // Set Address, if already set on order
    this.address.company = activeOrder?.shippingAddress?.company;
    this.address.streetLine1 = activeOrder?.shippingAddress?.streetLine1;
    this.address.streetLine2 = activeOrder?.shippingAddress?.streetLine2;
    this.address.city = activeOrder?.shippingAddress?.city;
    this.address.postalCode = activeOrder?.shippingAddress?.postalCode;
    this.shippingMethods = await this.$vendure.getEligibleShippingMethods();
    if (activeOrder?.shippingAddress?.country) {
      const country = this.availableCountries.find(
        (c) => c.name === activeOrder.shippingAddress.country
      );
      this.address.countryCode = country?.code || 'nl';
    }
    this.selectedShippingMethod =
      this.$store?.activeOrder?.shippingLines?.[0]?.shippingMethod.id;
  },
  async created() {
    this.getAddress = debounce(this.getAddress, 500);
  },
};
</script>
<style>
.b-steps .steps + .step-content {
  padding-left: 0;
  padding-right: 0;
}

.is-small-field {
  width: 150px;
}
</style>
