<template>
  <!------ Cart overview ---->
  <div v-if="address" class="address-display p-5" style="height: 100%">
    <h4>{{ title }}</h4>
    <p v-if="address.fullName">{{ address.fullName }}</p>
    <p v-if="address.company">{{ address.company }}</p>
    <p v-if="address.streetLine1">
      {{ address.streetLine1 }} {{ address.streetLine2 }}
    </p>
    <p v-if="address.postalCode">{{ address.postalCode }} {{ address.city }}</p>
    <p v-if="address.country">{{ address.country }}</p>
    <br />
    <p v-if="email">{{ email }}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      required: true,
    },
    address: Object,
    email: String,
  },
};
</script>
<style>
.address-display {
  border: 1px solid lightgray;
  border-radius: 4px;
}
</style>
