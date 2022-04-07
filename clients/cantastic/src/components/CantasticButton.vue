<template>
  <div
    v-if="isDiv"
    class="button is-danger is-family-secondary has-text-weight-bold"
  >
    <slot />
  </div>

  <g-link
    v-else
    class="button is-danger is-family-secondary has-text-weight-bold"
    :to="to"
  >
    <slot />
  </g-link>
</template>
<script>
export default {
  props: ['to', 'isDiv'],
};
</script>
