<template>
  <DefaultLayout>
    <template #fullwidth>
      <div class="outer-wrapper">
        <div class="wrapper">
          <template v-for="product of 5">
            <div class="slide">
              <Portfolio> </Portfolio>
            </div>
          </template>
        </div>
      </div>
    </template>
  </DefaultLayout>
</template>

<style>
.slide {
  width: 100vw;
  height: 100vh;
}

.wrapper {
  display: flex;
  flex-direction: row;
  width: 1000vh;
  transform: rotate(90deg) translateY(-100vh);
  transform-origin: top left;
}

.outer-wrapper {
  width: 100vh;
  height: 100vw;
  transform: rotate(-90deg) translateX(-100vh);
  transform-origin: top left;
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow: scroll;
}

::-webkit-scrollbar {
  display: none;
}
</style>

<script>
import Portfolio from '../components/Portfolio.vue';
export default {
  components: {
    Portfolio,
  },
};
</script>
