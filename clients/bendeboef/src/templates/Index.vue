<template>
  <Layout>

    <section class="hero is-primary is-halfheight hero-background">
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">
            {{ data.title }}
          </p>
          <p class="subtitle">
            {{ data.subTitle }}
          </p>
        </div>
      </div>
    </section>

    <br>
    <br>
    <section class="container is-fluid" id="bio">
      <h1 class="title">{{ data.bioTitle }}</h1>
      <p v-html="data.bio"></p>
      <br>
      <g-link v-for="cta of data.ctas"
              :key="cta.link"
              class="button mr-4 mb-4"
              :to="cta.link">
        {{ cta.text }}
      </g-link>
      <hr>
    </section>


    <section class="container is-fluid" id="featured-products">
      <h1 class="title">Latest Products</h1>
      <br>
      <p v-for="product of $context.featuredProducts">
        {{ product.name }}
      </p>
      <hr>
    </section>


  </Layout>
</template>

<script>

export default {
  components: {},
  data: () => ({
    data: require(`../data/${process.env.GRIDSOME_SITE}.json`)
  })
};
</script>
<style>
.hero-background {
  background-image: url("/img/ben-de-boef-tattoo.jpeg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #999;
}
</style>
