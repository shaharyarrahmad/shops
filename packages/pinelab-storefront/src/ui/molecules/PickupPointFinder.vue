<template>
  <div class="p-4 pickup-points">
    <b-field label="Postcode" label-position="on-border" style="width: 200px">
      <b-input
        v-model="postalCode"
        @input="$emit('postal-code-changed', postalCode)"
        minlength="6"
      ></b-input>
    </b-field>
    <p class="mb-3">
      Afhaalpunten in de buurt van <b>{{ postalCode }}</b
      >:
    </p>
    <template v-if="loading">
      <b-skeleton :animated="true"></b-skeleton>
      <b-skeleton :animated="true"></b-skeleton>
      <b-skeleton :animated="true"></b-skeleton>
    </template>
    <template v-else>
      <b-field v-for="point of displayedPoints" :key="point.location_code">
        <b-radio
          v-model="selectedPoint"
          @input="selectPickupPoint()"
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
      <a href="#" @click="showAll = !showAll">
        {{
          displayedPoints.length < pickupPoints.length
            ? 'Toon meer'
            : 'Toon minder'
        }}
      </a>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    initialPostalCode: String,
    loading: Boolean,
    pickupPoints: Array,
  },
  data() {
    return {
      selectedPoint: undefined,
      postalCode: undefined,
      showAll: false,
    };
  },
  computed: {
    displayedPoints() {
      const sortedPoints = this.pickupPoints?.sort((p) =>
        p.location_code === this.selectedPoint ? -1 : 0
      );
      return (this.showAll ? sortedPoints : sortedPoints?.slice(0, 3)) || [];
    },
  },
  methods: {
    async selectPickupPoint() {
      if (!this.selectedPoint) {
        return;
      }
      const point = this.pickupPoints.find(
        (p) => p.location_code === this.selectedPoint
      );
      if (!point) {
        throw Error(`No pickup point with ${code} exists in the list!`);
      }
      this.$emit('pickup-point-selected', point);
    },
  },
  mounted() {
    this.postalCode = this.initialPostalCode;
  },
};
</script>
<style>
.pickup-points {
  border: 1px solid lightgray;
  border-radius: 4px;
}
</style>
