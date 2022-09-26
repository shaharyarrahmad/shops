<template>
  <!--NAVBAR-->
  <nav role="navigation" aria-label="main navigation"
    class="navbar-expanded is-fixed-top sticky-top has-navbar-centered" style="">
    <div class="navbar-brand">
      <div id="top-navbar" class="container is-widescreen section p-5">
        <div class="columns is-mobile is-centered">
          <div id="main-logo" class="column">
            <a href="/">
              <img src="/img/wavkits-black.png" width="130px" alt="wavkits.com logo" id="logo" class="cursor" />
            </a>
          </div>

          <!--SEARCHBAR-->

          <div id="search" class="column is-hidden-mobile">
            <b-field class="">
              <b-autocomplete custom-class="input"
                  rounded
                  :data="[]"
                  placeholder="Search for kits..."
                  icon="magnify"
                  clearable>
                  <template #empty>No results found</template>
              </b-autocomplete>
            </b-field>
          </div>

          <!--SEARCH(MOBILE) / CART / FAVOURITE ICONS -->

          <div id="icons" class="column has-text-right">
            <span class="icon is-large is-hidden-tablet is-clickable">
              <i class="mdi mdi-magnify mdi-36px has-text-black"
                style="z-index: 999">
              </i>
            </span>

            <Basket class="wk-favourites"
              :vendure="$vendure" 
              :store="$store" 
              :emitter="$emitter" 
              
              @favourites-button-clicked="
              $router.push('/favourites/').catch((e) => {})"
              >

              <i class="mdi mdi-heart-outline mdi-36px has-text-black"></i>
            </Basket>

            <Basket class="wk-basket" 
              :vendure="$vendure" 
              :store="$store" 
              :emitter="$emitter" 

              @cart-button-clicked="
              $router.push('/cart/').catch((e) => {})
            " @checkout-button-clicked="
              $router.push('/checkout/').catch((e) => {})
            ">
              <i class="mdi mdi-basket-outline mdi-36px has-text-black"></i>
            </Basket>

            <span class="icon is-large is-hidden-desktop is-clickable">
              <i class="mdi mdi-menu mdi-36px has-text-black"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- NAVBAR VARIABLES -->

    <div class="center ">
      <div class="navbar-menu">
        <div class="navbar-start">
          <div id="navbar-items-wrapper" class="container is-widescreen section is-hidden-mobile">
            <template v-for="category in $context.categories">
              <div class="navbar-item has-dropdown is-hoverable">
                <g-link :to="`/category/${category.slug}`" class="navbar-link is-arrowless"> {{category.name }}
                </g-link>
                <div class="navbar-dropdown">
                  <div class="container section py-1">
                    <div class="columns">
                      <div class="column">
                        <template v-for="subcategory in category.children">
                          <g-link :to="`/category/${category.slug}/${subcategory.slug}`" class="navbar-item px-0"> {{ subcategory.name }} </g-link>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div clas="navbar-end"></div>
    </div>
  </nav>
</template>

<script>
export default {
props: ['item'],
};
</script>

</script>

<style lang="scss"></style>
