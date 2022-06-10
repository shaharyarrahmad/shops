<template>
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
              v-on:input="lookupAddress()"
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
              v-on:input="lookupAddress()"
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
        <a @click="$emit('back')" class="button is-outlined"><</a>
      </div>
      <div class="column has-text-right">
        <button
          type="submit"
          class="button is-primary"
          :disabled="loadingShipping"
        >
          {{ submitLabel }}
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import { VendureClient } from '../../vendure/vendure.client';
import { debounce } from 'debounce';

export default {
  props: {
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
    submitLabel: { default: 'Shipping' },
    availableCountries: {
      type: Array,
      default() {
        return [{ name: 'Nederland', code: 'nl' }];
      },
    },
    vendure: VendureClient,
  },
  data() {
    return {
      loadingShipping: false,
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
    };
  },
  async mounted() {
    const activeOrder = await this.vendure.getActiveOrder();
    const localStorageCustomer = window.localStorage.getItem('vnd_customer');
    const localStorageAddress = window.localStorage.getItem('vnd_address');
    const customer = localStorageCustomer
      ? JSON.parse(localStorageCustomer)
      : activeOrder?.customer;
    const address = localStorageAddress
      ? JSON.parse(localStorageAddress)
      : activeOrder?.shippingAddress;
    // Set Customer, if already set on order
    this.customer.firstName = customer?.firstName;
    this.customer.lastName = customer?.lastName;
    this.customer.phoneNumber = customer?.phoneNumber;
    this.customer.emailAddress = customer?.emailAddress;
    // Set Address, if already set on order
    this.address.company = address?.company;
    this.address.streetLine1 = address?.streetLine1;
    this.address.streetLine2 = address?.streetLine2;
    this.address.city = address?.city;
    this.address.postalCode = address?.postalCode;
    this.shippingMethods = await this.vendure.getEligibleShippingMethods();
    if (address?.country) {
      const country = this.availableCountries.find(
        (c) => c.name === address.country
      );
      this.address.countryCode = country?.code || 'nl';
    }
  },
  methods: {
    setCustomerDetails: async function (e) {
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
        await this.vendure.setCustomerForOrder(this.customer);
        await this.vendure.setOrderShippingAddress(address);
        await this.vendure.setDefaultShippingMethod();
      } catch (e) {
        console.error(e);
        this.$emit('error');
      } finally {
        this.loadingShipping = false;
      }
      // Save details in local storage for next time
      try {
        window.localStorage.setItem(
          'vnd_customer',
          JSON.stringify(this.customer)
        );
        window.localStorage.setItem(
          'vnd_address',
          JSON.stringify(this.address)
        );
      } catch (e) {
        console.error(e);
      }
      this.$emit('submit');
    },
    async lookupAddress() {
      if (this.address?.postalCode?.length < 6 || !this.address?.streetLine2) {
        return;
      }
      const address = await this.vendure.lookupAddress({
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
  async created() {
    this.lookupAddress = debounce(this.lookupAddress, 500);
  },
};
</script>
