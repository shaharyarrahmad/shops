<template>
  <section class="container is-max-desktop">
    <b-steps
      v-model="activeStep"
      :animated="true"
      :rounded="true"
      :has-navigation="false"
      label-position="bottom"
      mobile-mode="compact">

      <!--- CUSTOMER DETAILS -------------------------------------->
      <b-step-item step="1" :label="customerDetailsLabel" icon="account" :clickable="false">
        <br>
        <form v-on:submit="goToShipping($event)">

          <div class="columns">
            <div class="column">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <b-input :placeholder="companyLabel" type="text" v-model="address.company" />
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
                  <b-input :placeholder="`${firstnameLabel}*`" type="text" required v-model="customer.firstName"/>
                  <span class="icon is-small is-left">
                  <i class="mdi mdi-account"></i>
                </span>
                </p>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <b-input :placeholder="`${lastnameLabel}*`" type="text" required v-model="customer.lastName"/>
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
                  <b-input :placeholder="phoneLabel" type="text" v-model="customer.phoneNumber"/>
                  <span class="icon is-small is-left">
                  <i class="mdi mdi-cellphone-basic"></i>
                </span>
                </p>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <b-input :placeholder="`${emailLabel}*`" type="text" required v-model="customer.emailAddress"/>
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
                  <b-input :placeholder="`${postalCodeLabel}*`" type="text" required v-model="address.postalCode"/>
                  <span class="icon is-small is-left">
                  <i class="mdi mdi-mailbox"></i>
                </span>
                </p>
              </div>
            </div>
            <div class="column is-narrow">
              <div class="field is-small-field">
                <p class="control is-expanded has-icons-left">
                  <b-input :placeholder="`${houseNumberLabel}*`" type="text" required v-model="address.streetLine2"/>
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
                  <b-input :placeholder="`${streetLabel}*`" type="text" required v-model="address.streetLine1"/>
                  <span class="icon is-small is-left">
                  <i class="mdi mdi-home"></i>
                </span>
                </p>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <b-input :placeholder="`${cityLabel}*`" type="text" required v-model="address.city"/>
                  <span class="icon is-small is-left">
                  <i class="mdi mdi-city"></i>
                </span>
                </p>
              </div>
            </div>
          </div>

              <b-field>
                <b-select :placeholder="countryLabel" name="country" icon="earth" v-model="address.countryCode">
                  <option value="nl" selected>Nederland</option>
                  <option value="de">Duitsland</option>
                  <option value="be">België</option>
                </b-select>
              </b-field>


          <div class="columns is-mobile">
            <div class="column">
              <a @click="goBack()" class="button is-outlined"><</a>
            </div>
            <div class="column has-text-right">
              <b-button type="submit" class="button is-primary" :class="loadingShipping"> {{ shippingLabel }} ></b-button>
            </div>
          </div>
        </form>

      </b-step-item>

      <!--- SHIPPING -------------------------------------->
      <b-step-item step="2" :label="shippingLabel" icon="truck" :clickable="false">
        shipping
      </b-step-item>


      <!--- PAYMENT -------------------------------------->
      <b-step-item step="3" :label="paymentLabel" icon="currency-eur" :clickable="false" disabled>
        payments
      </b-step-item>

      <template
        #navigation="{previous, next}">
        <br> <!-- empty -->
      </template>
    </b-steps>
  </section>
</template>
<script>

export default {
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
    countryLabel: { default: 'Country' }
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder || {};
    }
  },
  data() {
    return {
      loadingShipping: false,
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
    };
  },
  methods: {
    async goToShipping(e) {
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
      } finally {
        this.loadingShipping = false;
      }
      this.activeStep = 1;
    },
    goBack() {
      if (this.activeStep === 0) {
        this.$router.push(this.previousPage);
      }
      this.activeStep -= 1;
    }
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
    if (!this.$store.activeOrder) {
      await this.$router.push('/');
    }
  }
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
