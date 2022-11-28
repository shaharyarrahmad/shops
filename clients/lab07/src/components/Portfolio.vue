<template>
  <section class="hero p-5 is-justify-content-center is-flex-direction-row">
    <div class="tile has-text-centered">
      <div class="tile is-parent">
        <div class="carousel-container">
          <b-carousel
            :arrow="arrow"
            :repeat="arrowBoth"
            :arrow-hover="arrowHover"
            :icon-pack="iconPack"
            :icon-prev="iconPrev"
            :icon-next="iconNext"
            :icon-size="iconSize"
            :autoplay="autoPlay"
            :pause-hover="pauseHover"
            :animated="animated"
          >
            <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
              <b-image :src="carousel.url" />
            </b-carousel-item>
          </b-carousel>
        </div>
      </div>
      <div class="tile is-parent is-vertical">
        <article class="tile is-child">
          <p class="title big">podiumschool leeuwarden</p>
        </article>
        <article class="tile is-child">
          <p class="subtitle">foto's van docenten van de podiumschool</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      animated: 'slide',
      autoPlay: false,
      pauseHover: false,
      carousels: [
        { url: require('/static/1.jpg') },
        { url: require('/static/2.jpg') },
        { url: require('/static/3.jpg') },
        { url: require('/static/4.jpg') },
        { url: require('/static/5.jpg') },
        { url: require('/static/6.jpg') },
        { url: require('/static/7.jpg') },
      ],
    };
  },
};
</script>
<style>
.title.big {
  font-size: 3rem !important;
  font-weight: normal;
  color: black;
  bottom: 0;
  position: absolute;
  margin: -24px;
}

.tile {
  max-width: 1000px;
  position: relative;
  box-sizing: border-box;
}

.carousel-container {
  height: 600px;
  max-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex !important;
  background-color: none;
}

@media only screen and (max-width: 600px) {
  .carousel-container {
    height: auto;
  }
}

.image img {
  max-height: 600px;
  height: auto;
  width: 476px;
}
</style>
