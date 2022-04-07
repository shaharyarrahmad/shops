<template>
  <div
    class="box card-background-image has-text-centered"
    :style="`background-image: url(${image});`"
  >
    <h4 class="has-text-white py-5">{{ name }}</h4>
  </div>
</template>
<script>
export default {
  props: ['image', 'name'],
};
</script>
<style></style>
