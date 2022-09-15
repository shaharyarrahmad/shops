<template>
  <footer class="footer pb-0 has-text-black">
    <div class="container">
      <div class="columns" style="border-bottom: 1px solid black">
        <div class="column is-3 pb-4" >
          <a class="mb-4 is-inline-block">
            <img src="/img/wavkits-black.png" width="130px" alt="wavkits.com logo" id="logo" class="cursor" />
          </a>
          <p class="has-text-black mb-6">The place that producers need.</p>


        </div>
        <div class="column is-3">
          <h4 class="is-size-4 has-text-weight-superbold mb-4 is-underlined">Categories</h4>
          <template v-for="category in $context.categories">
            <g-link :to="`/category/${category.slug}`" class="navbar-item"> {{category.name }}
            </g-link>
          </template>
        </div>
        <div class="column is-3">
          <h4 class="is-size-4 has-text-weight-superbold mb-4 is-underlined">Support</h4>
          <g-link to="/" class="navbar-link is-arrowless">
          </g-link>
        </div>
        <div class="column is-3">
          <h4 class="is-size-4 has-text-weight-superbold mb-4 is-underlined">How to use</h4>
        </div>
      </div>
      <div class="has-text-right">
        <g-link to="https://pinelab.studio/" class="has-text-black">Made with passion by <bold>@roelobeats</bold></g-link>
      </div>
      <div class="has-text-left">
        <i class="mdi mdi-facebook mdi-24px has-text-black"></i>
        <i class="mdi mdi-instagram mdi-24px has-text-black"></i>
        <i class="mdi mdi-twitter mdi-24px has-text-black"></i>
        <i class="mdi mdi-youtube mdi-24px has-text-black"></i>
        <i class="mdi mdi-soundcloud mdi-24px has-text-black"></i>
      </div>
    </div>
  </footer>
</template>