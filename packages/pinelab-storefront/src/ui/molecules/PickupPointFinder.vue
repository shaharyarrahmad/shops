<template>
  <div>
    <b-field label="Postcode" label-position="on-border" style="width: 200px">
      <b-input v-model="postalCode" @input="getDropOffPoints()"></b-input>
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
          @input="$emit('select', selectedPoint)"
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
<script>
export default {
  props: {
    loading: Boolean,
    allPoints: Array,
  },
  computed: {
    pickupPointSelected() {
      return (
        this.store?.activeOrder?.shippingLines?.[0]?.shippingMethod?.code?.indexOf(
          'pickup-point'
        ) > -1
      );
    },
  },
  data() {
    return {
      selectedPoint: undefined,
    };
  },
  methods: {
    toggleShowAll() {
      if (this.displayedPoints.length < this.allPoints.length) {
        this.displayedPoints = this.allPoints;
      } else {
        this.displayedPoints = this.allPoints.slice(0, 3);
      }
      this.moveSelectedToTop();
    },
  },
};
</script>
