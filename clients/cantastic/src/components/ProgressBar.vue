<template>
  <ClientOnly>
    <div
      v-if="isLoading"
      class="progress-bar"
      :style="`background-color: ${color1};`"
    >
      <div
        class="moving-bar"
        :style="`background: linear-gradient(90deg, ${color1}, ${color2}, ${color1});`"
      />
    </div>
  </ClientOnly>
</template>
<script>
/**
 * Add this to your App.vue `<ProgressBar />`. Do not add to a layout or component,
 * as this will result in a new route subscription every page load
 * Add this to main.js:
 * router.beforeEach((to, from, next) => {
 *       Vue.prototype.$emitter.emit('loading');
 *       next();
 *     });
 *  router.afterEach((to, from) => {
 *       Vue.prototype.$emitter.emit('finishedLoading');
 *     });
 */
export default {
  props: ['color1', 'color2'],
  data() {
    return {
      isLoading: false,
    };
  },
  mounted() {
    this.$emitter.on('loading', () => (this.isLoading = true));
    this.$emitter.on('finishedLoading', () => (this.isLoading = false));
  },
  beforeDestroy() {
    this.$emitter.off('loading');
    this.$emitter.off('finishedLoading');
  },
};
</script>
<style>
.moving-bar,
.progress-bar {
  height: 4px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
}

.moving-bar {
  animation: load 2s linear infinite;
}

@keyframes load {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
