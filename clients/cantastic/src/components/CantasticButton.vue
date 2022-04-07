<template>
  <div
    v-if="isDiv"
    class="button is-danger is-family-secondary has-text-weight-bold"
  >
    <span><slot /></span>
    <span class="icon is-large is-hidden-mobile"
      ><i class="mdi mdi-chevron-right"></i
    ></span>
  </div>

  <g-link
    v-else
    class="button is-danger is-family-secondary has-text-weight-bold"
    :to="to"
  >
    <span><slot /></span>
    <span class="icon is-large is-hidden-mobile"
      ><i class="mdi mdi-chevron-right"></i
    ></span>
  </g-link>
</template>
<script>
export default {
  props: ['to', 'isDiv'],
};
</script>
