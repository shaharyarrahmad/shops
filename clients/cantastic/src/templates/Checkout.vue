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
            :clickable="false"
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
            <SelectShippingForm
              :vendure="$vendure"
              :store="$store"
              :shipping-methods="shippingMethods"
              :selected-shipping-method="selectedShippingMethod"
              @back="activeStep = 0"
            >
              <template #shipping>
                <!-------------------- Pickup point selection ------------------>
                <div v-if="pickupPointSelected" style="margin-left: 31px">
                  <b-field
                    label="Postcode"
                    label-position="on-border"
                    style="width: 200px"
                  >
                    <b-input
                      v-model="postalCode"
                      @input="getDropOffPoints()"
                    ></b-input>
                  </b-field>
                  <p class="mb-3">
                    Afhaalpunten in de buurt van <b>{{ postalCode }}</b
                    >:
                  </p>
                  <template v-if="loadingDropOffPoints">
                    <b-skeleton :animated="true"></b-skeleton>
                    <b-skeleton :animated="true"></b-skeleton>
                    <b-skeleton :animated="true"></b-skeleton>
                  </template>
                  <template v-else>
                    <b-field
                      v-for="point of displayedPoints"
                      :key="point.location_code"
                    >
                      <b-radio
                        v-model="selectedPoint"
                        @input="selectPickupPoint()"
                        :native-value="point.location_code"
                      >
                        <b>{{ point.location_name }}</b
                        ><br />
                        <span class="is-size-7"
                          >{{ point.street }} {{ point.number
                          }}{{ point.number_suffix || '' }},
                          {{ point.postal_code }}, {{ point.city }}</span
                        >
                      </b-radio>
                    </b-field>
                    <a href="#" @click="toggleShowAll()">
                      {{
                        displayedPoints.length < allPoints.length
                          ? 'Toon meer'
                          : 'Toon minder'
                      }}
                    </a>
                  </template>
                </div>
              </template>
            </SelectShippingForm>
          </b-step-item>

          <!--- PAYMENT -------------------------------------->
          <b-step-item
            step="3"
            label="Betaling"
            icon="currency-eur"
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
import { debounce } from 'debounce';

export default {
  components: {
    CheckoutSteps,
    CustomerDetailsForm,
    SelectShippingForm,
  },
  data() {
    return {
      loadingDropOffPoints: true,
      allPoints: undefined,
      displayedPoints: undefined,
      selectedPoint: undefined,
      postalCode: undefined,
      activeStep: 0,
      shippingMethods: [],
    };
  },
  computed: {
    selectedShippingMethod() {
      return this.$store?.activeOrder?.shippingLines?.[0]?.shippingMethod.id;
    },
  },

  methods: {
    async gotToShipping() {
      this.activeStep = 1;
      this.shippingMethods = await this.$vendure.getEligibleShippingMethods();
    },
    toggleShowAll() {
      if (this.displayedPoints.length < this.allPoints.length) {
        this.displayedPoints = this.allPoints;
      } else {
        this.displayedPoints = this.allPoints.slice(0, 3);
      }
      this.moveSelectedToTop();
    },
    async selectPickupPoint() {
      if (!this.selectedPoint) {
        return;
      }
      const point = this.allPoints.find(
        (p) => p.location_code == this.selectedPoint
      );
      if (!point) {
        throw Error(`No pickup point with ${code} exists in the list!`);
      }
      await this.$vendure.setPickupLocationOnOrder({
        pickupLocationNumber: String(point.location_code),
        pickupLocationCarrier: String(point.carrier_id),
        pickupLocationName: point.location_name,
        pickupLocationStreet: point.street,
        pickupLocationHouseNumber: `${point.number}${
          point.number_suffix || ''
        }`,
        pickupLocationZipcode: point.postal_code,
        pickupLocationCity: point.city,
        pickupLocationCountry: 'nl',
      });
      console.log(`Selected ${point.location_name} as pickup point`);
      this.moveSelectedToTop();
    },
    async unsetPickupPoint() {
      await this.$vendure.unsetPickupLocation();
      console.log('Removed pickupLocation from order');
    },
    moveSelectedToTop() {
      this.displayedPoints = this.displayedPoints.sort((p) =>
        p.location_code == this.selectedPoint ? -1 : 0
      );
    },
  },
};
</script>
<style></style>
