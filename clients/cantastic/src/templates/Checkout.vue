<template>
  <DefaultLayout>
    <template #content>
      <section class="container is-max-desktop">
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
            label="Gegevens"
            icon="account"
            :clickable="true"
          >
            <br />
            <CustomerDetailsForm
              submit-label="Verzending >"
              city-label="Plaats"
              company-label="Bedrijfsnaam"
              firstname-label="Voornaam"
              lastname-label="Achternaam"
              phone-label="Telefoonnr."
              email-label="Email"
              postal-code-label="Postcode"
              country-label="Land"
              street-label="Straat"
              house-number-label="Huisnr."
              :available-countries="[
                { name: 'Nederland', code: 'nl' },
                { name: 'België', code: 'be' },
                { name: 'Duitsland', code: 'de' },
              ]"
              :vendure="$vendure"
              @back="$router.push('/winkelmand/')"
              @submit="gotToShipping()"
            ></CustomerDetailsForm>
          </b-step-item>

          <!--- SHIPPING -------------------------------------->
          <b-step-item
            step="2"
            label="Verzending"
            icon="truck"
            :clickable="false"
          >
            <br />
            <div class="columns">
              <div class="column is-6">
                <SelectShippingForm
                  :vendure="$vendure"
                  :store="$store"
                  :shipping-methods="shippingMethods"
                  :pickup-points-enabled="true"
                  submit-label="Controleer je bestelling >"
                />
              </div>
              <div class="column is-offset-2">
                <OrderSummary
                  class="mb-5"
                  shipping-label="Verzendkosten"
                  subtotal-label="Subtotaal"
                  total-label="Totaal"
                  summary-title="Samenvatting"
                  :active-order="activeOrder"
                >
                  <template #bottom>
                    <br />
                    <b-button
                      type="is-info"
                      class="is-fullwidth"
                      :disable="hasShippingSelected"
                      @click="activeStep = 2"
                    >
                      Bestelling controleren
                    </b-button>
                  </template>
                </OrderSummary>
                <h5>Betaalmogelijkheden</h5>
                <img src="/img/payments.png" alt="Betaalmogelijkheden" />
              </div>
            </div>
          </b-step-item>

          <!--- PAYMENT -------------------------------------->
          <b-step-item
            step="3"
            label="Controleer je bestelling"
            icon="playlist-check"
            :clickable="false"
            disabled
          >
            <br />
          </b-step-item>

          <!--- Order -------------------------------------->
          <b-step-item
            step="4"
            label="Naar de jaap!"
            icon="check"
            :clickable="false"
            disabled
          >
          </b-step-item>
        </b-steps>
      </section>
    </template>
  </DefaultLayout>
</template>
<script>
import CheckoutSteps from 'pinelab-storefront/lib/ui/organisms/CheckoutSteps';
import CustomerDetailsForm from 'pinelab-storefront/lib/ui/organisms/CustomerDetailsForm';
import SelectShippingForm from 'pinelab-storefront/lib/ui/organisms/SelectShippingForm';
import OrderSummary from 'pinelab-storefront/lib/ui/molecules/OrderSummary';

export default {
  components: {
    CheckoutSteps,
    CustomerDetailsForm,
    SelectShippingForm,
    OrderSummary,
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder || {};
    },
    hasShippingSelected() {
      return !!this.$store.activeOrder?.shippingLines?.[0]?.shippingMethod?.id;
    },
  },
  data() {
    return {
      activeStep: 0,
      shippingMethods: [],
    };
  },
  methods: {
    async gotToShipping() {
      this.activeStep = 1;
      this.shippingMethods = await this.$vendure.getEligibleShippingMethods();
    },
  },
};
</script>
<style></style>
