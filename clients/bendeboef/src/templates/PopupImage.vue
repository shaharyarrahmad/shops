<template>
  <div>
    <div @click="show = true">
      <b-image
        :src="small"
        :alt="alt"
        ratio="1by1"
        class="is-clickable"
      />
    </div>
    <b-modal v-model="show">
      <p class="image">
        <img :src="large" :alt="alt" />
      </p>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: ['small', 'alt', 'large'],
  data() {
    return {
      show: false
    };
  }
};
</script>
