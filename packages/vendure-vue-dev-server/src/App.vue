<template>
  <h1>Vendure Vue components - dev server</h1>
  <ActiveOrder v-slot="props">
    testing
    {{ props }}
    {{ $store }}
    nee
    <!--    <a href="/cart/">Go to cart ( {{ nrOfItems }} )</a>
    <ul>
      <li v-for="line of orderLines"> {{ line.name }} - {{ line.quantity }}x </li>
    </ul>-->
  </ActiveOrder>
</template>
<script>
export default {};
</script>
