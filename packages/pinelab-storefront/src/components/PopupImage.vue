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
      <template v-if="assets && assets.length > 1">
        <b-carousel
          :arrow="true"
          :repeat="true"
          :arrow-hover="false"
          icon-pack="mdi"
          :autoplay="false"
          :pause-info="false"
        >
          <b-carousel-item v-for="(asset, i) in assets" :key="i">
            <b-image
              :src="asset"
              :alt="alt"
              :placeholder="placeholder"
              class="is-clickable"
            />
          </b-carousel-item>
        </b-carousel>
      </template>
      <template v-else>
        <b-image
          :src="large"
          :alt="alt"
          :placeholder="placeholder"
          class="is-clickable"
        />
      </template>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: ['small', 'alt', 'large', 'placeholder', 'assets'],
  data() {
    return {
      show: false,
    };
  },
};
</script>
