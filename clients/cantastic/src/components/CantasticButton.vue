<template>
  <g-link
    class="button is-danger is-family-secondary has-text-weight-bold"
    :to="to"
  >
    <slot />
  </g-link>
</template>
<script>
export default {
  props: ['to'],
};
</script>
