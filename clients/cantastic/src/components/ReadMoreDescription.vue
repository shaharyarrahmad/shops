<template>
  <div v-if="description">
    <div :class="`collapse-${collapse} mb-0`">{{ plaintext }}</div>
    <div v-if="isDescriptionLongEnough" class="has-text-right">
      <a href="#full-description">Lees meer</a>
    </div>
  </div>
</template>
<script>
export default {
  props: ['description', 'maxLength', 'collapse'],
  data() {
    return {
      plaintext: undefined,
    };
  },
  created() {
    this.plaintext = new DOMParser().parseFromString(
      this.description,
      'text/html'
    ).documentElement.textContent;
    console.log(this.plaintext);
  },
  computed: {
    isDescriptionLongEnough() {
      return this.description?.length > this.maxLength;
    },
  },
};
</script>
<style>
#full-description::before {
  display: block;
  content: ' ';
  margin-top: -200px;
  height: 200px;
  visibility: hidden;
  pointer-events: none;
}
</style>
