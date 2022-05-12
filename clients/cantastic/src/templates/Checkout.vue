<template>
  <DefaultLayout>
    <template #content>
      <CheckoutSteps
        previousPage="/cart/"
        :availableCountries="$context.availableCountries"
        total-label="Totaal"
        payment-method-label="Hoe wil je betalen?"
        succes-label="Naar de jaap!"
        payment-label="Betaling"
        shipping-label="Verzending"
        house-number-label="Huisnr."
        country-label="Land"
        street-label="Straat"
        postal-code-label="Postcode"
        email-label="Email"
        phone-label="Telefoonnr."
        lastname-label="Achternaam"
        firstname-label="Voornaam"
        company-label="Bedrijfsnaam"
        city-label="Plaats"
        :available-countries="[
          { name: 'Nederland', code: 'nl' },
          { name: 'Germany', code: 'de' },
          { name: 'België', code: 'be' },
        ]"
        cart-overview-label="Jouw bestelling"
        customer-details-label="Gegevens"
        previous-page="/"
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
                  :native-value="point.location_code"
                >
                  <b>{{ point.location_name }}</b
                  ><br />
                  <span class="is-size-7"
                    >{{ point.street }} {{ point.number
                    }}{{ point.number_suffix || '' }}, {{ point.postal_code }},
                    {{ point.city }}</span
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
      </CheckoutSteps>
    </template>
  </DefaultLayout>
</template>
<script>
import CheckoutSteps from 'pinelab-storefront-client/lib/buefy-components/CheckoutSteps';
import { debounce } from 'debounce';

export default {
  components: {
    CheckoutSteps,
  },
  data() {
    return {
      loadingDropOffPoints: true,
      allPoints: undefined,
      displayedPoints: undefined,
      selectedPoint: undefined,
      postalCode: undefined,
    };
  },
  computed: {
    pickupPointSelected() {
      return (
        this.$store.activeOrder?.shippingLines?.[0]?.shippingMethod?.code?.indexOf(
          'pickup-point'
        ) > -1
      );
    },
  },
  watch: {
    pickupPointSelected(newValue) {
      if (newValue) {
        this.postalCode = this.$store.activeOrder?.shippingAddress?.postalCode;
        this.getDropOffPoints();
      }
    },
  },
  created() {
    this.getDropOffPoints = debounce(this.getDropOffPoints, 200);
  },
  methods: {
    async getDropOffPoints() {
      try {
        this.loadingDropOffPoints = true;
        this.allPoints = await this.$vendure.getDropOffPoints({
          carrierId: '1',
          postalCode: this.postalCode,
        });
        this.displayedPoints = this.allPoints.slice(0, 3);
        this.loadingDropOffPoints = false;
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingDropOffPoints = false;
      }
    },
    toggleShowAll() {
      if (this.displayedPoints.length < this.allPoints.length) {
        this.displayedPoints = this.allPoints;
      } else {
        this.displayedPoints = this.allPoints.slice(0, 3);
      }
    },
  },
};
</script>
<style></style>
