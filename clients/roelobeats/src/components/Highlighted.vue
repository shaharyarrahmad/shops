<template>
  <div class="content container">
    <div class="container is-widescreen section p-5">
      <section id="highlighted">
        <div class="columns pt-4">
          <div class="column is-8">
            <div class="columns is-mobile is-multiline">
              <div class="column is-12-tablet is-6-mobile">
                <h3>Latest releases</h3>
                <div class="hover-container">
                  <div
                    class="box card-background-image"
                    :style="`background-image:url(${$context.highlight1.featuredAsset.preview});`"
                  ></div>
                  <div class="overlay"></div>
                  <div class="button is-black is-outlined">Shop now</div>
                </div>
              </div>
              <div class="column is-6-tablet is-6-mobile">
                <h3>Categories</h3>
                <div
                  class="box card-background-image image-hover"
                  :style="`background-image:url(${$context.highlight2.featuredAsset.preview});`"
                ></div>
              </div>
              <div class="column is-6-tablet is-6-mobile">
                <h3>Deals</h3>
                <div
                  class="box card-background-image image-hover"
                  :style="`background-image:url(${$context.highlight3.featuredAsset.preview});`"
                ></div>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="columns is-mobile is-multiline">
              <div class="column">
                <h3>Most popular</h3>
                <div id="most-popular" class="box">
                  <template v-for="product in $context.topproducts">
                    <article class="media my-3">
                      <figure class="media-left">
                        <div class="">
                          <p class="image image-hover is-96x96">
                            <img :src="product.featuredAsset.thumbnail" />
                          </p>
                        </div>
                      </figure>
                      <div class="media-content">
                        <div class="content line-clamp-4">
                          <h5>{{ product.name }}</h5>
                          <div v-html="product.description"></div>
                        </div>
                      </div>
                    </article>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script></script>
