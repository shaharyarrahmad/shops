<template>
  <DefaultLayout>
    <template #content>
      <ClientOnly>
        <div class="container is-max-desktop">
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
              label="Adres"
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
                different-billing-address-label="Ander factuuradres"
                billing-address-label="Factuuradres"
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
              <h3>Verzendwijze kiezen:</h3>
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
                <div class="column is-offset-1">
                  <OrderSummary
                    class="mb-5"
                    shipping-label="Verzendkosten"
                    subtotal-label="Subtotaal (incl. korting)"
                    total-label="Totaal"
                    summary-title="Samenvatting"
                    :order="activeOrder"
                  >
                    <template #bottom>
                      <br />
                      <b-button
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

            <!--- CHECKUP -------------------------------------->
            <b-step-item
              step="3"
              label="Controleer je bestelling"
              icon="playlist-check"
              :clickable="false"
              disabled
            >
              <br />
              <div class="columns">
                <div class="column is-6">
                  <div class="columns">
                    <div class="column">
                      <AddressDisplay
                        title="Verzendadres"
                        :address="activeOrder.shippingAddress || {}"
                        :email="
                          activeOrder.customer
                            ? activeOrder.customer.emailAddress
                            : undefined
                        "
                      />
                    </div>
                    <div
                      class="column"
                      v-if="
                        activeOrder.billingAddress &&
                        activeOrder.billingAddress.postalCode
                      "
                    >
                      <AddressDisplay
                        title="Factuuradres"
                        :address="activeOrder.billingAddress || {}"
                      />
                    </div>
                  </div>

                  <h4>Producten</h4>
                  <div class="scrollable-product-overview">
                    <CartItemsTable disabled :active-order="activeOrder" />
                  </div>
                </div>
                <div class="column is-5 is-offset-1">
                  <OrderSummary
                    class="mb-5"
                    shipping-label="Verzendkosten"
                    subtotal-label="Subtotaal (incl. korting)"
                    total-label="Totaal"
                    summary-title="Samenvatting"
                    :order="activeOrder"
                  >
                    <template #bottom>
                      <br />
                      <b-button
                        class="is-fullwidth"
                        :disable="hasShippingSelected"
                        @click="startPayment()"
                      >
                        Betalen
                      </b-button>
                      <br />
                      <small
                        >Door te klikken op "Doorgaan en betalen" ga ik akkoord
                        met de algemene voorwaarden. Ik heb kennis genomen van
                        de annuleringsvoorwaarden en de
                        privacyverklaring.</small
                      >
                    </template>
                  </OrderSummary>
                  <h5>Betaalmogelijkheden</h5>
                  <img src="/img/payments.png" alt="Betaalmogelijkheden" />
                </div>
              </div>
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
        </div>
      </ClientOnly>
    </template>
  </DefaultLayout>
</template>
<script>
import CustomerDetailsForm from 'pinelab-storefront/lib/ui/organisms/CustomerDetailsForm';
import SelectShippingForm from 'pinelab-storefront/lib/ui/organisms/SelectShippingForm';
import OrderSummary from 'pinelab-storefront/lib/ui/molecules/OrderSummary';
import AddressDisplay from 'pinelab-storefront/lib/ui/molecules/AddressDisplay';
import CartItemsTable from 'pinelab-storefront/lib/ui/organisms/CartItemsTable';
import { startPayment } from 'pinelab-storefront';

export default {
  components: {
    CustomerDetailsForm,
    SelectShippingForm,
    OrderSummary,
    AddressDisplay,
    CartItemsTable,
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder || {};
    },
    hasShippingSelected() {
      return !!this.$store?.activeOrder?.shippingLines?.[0]?.shippingMethod?.id;
    },
  },
  data() {
    return {
      activeStep: 0,
      shippingMethods: [],
      loadingPayment: false,
    };
  },
  methods: {
    async gotToShipping() {
      this.activeStep = 1;
      this.shippingMethods = await this.$vendure.getEligibleShippingMethods();
    },
    async startPayment() {
      this.loadingPayment = true;
      try {
        await startPayment(this.$vendure, 'mollie');
      } finally {
        this.loadingPayment = false;
      }
    },
  },
};
</script>
<style>
.scrollable-product-overview {
  max-height: 300px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
