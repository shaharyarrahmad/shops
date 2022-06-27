<template>
  <div v-if="description">
    <div
      v-html="description"
      :class="`collapsed-${collapse} content mb-0`"
    ></div>
    <div v-if="isDescriptionLongEnough" class="has-text-right">
      <a href="#full-description">Lees meer</a>
    </div>
  </div>
</template>
<script>
export default {
  props: ['description', 'maxLength', 'collapse'],
  computed: {
    isDescriptionLongEnough() {
      return this.description?.length > this.maxLength;
    },
  },
};
</script>
<style>
/* Make hastag navigation move to center instead of all the way to the top */
#full-description::before {
  display: block;
  content: ' ';
  margin-top: -200px;
  height: 200px;
  visibility: hidden;
  pointer-events: none;
}
</style>
