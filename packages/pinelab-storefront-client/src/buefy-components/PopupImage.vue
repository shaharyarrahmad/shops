<template>
  <div>
    <div @click="show = true">
      <b-image
        :src="small"
        :alt="alt"
        :placeholder="placeholder"
        class="is-clickable"
      />
    </div>
    <b-modal v-model="show">
      <b-image
        :src="large"
        :alt="alt"
        :placeholder="placeholder"
        class="is-clickable"
      />
    </b-modal>
  </div>
</template>
<script>
export default {
  props: ['small', 'alt', 'large', 'placeholder'],
  data() {
    return {
      show: false
    };
  }
};
</script>
