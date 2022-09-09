<template>
  <!--NAVBAR-->
  <nav
    role="navigation"
    aria-label="main navigation"
    class="navbar-expanded is-fixed-top sticky-top has-navbar-centered" 
    style=""
  >
    <div class="navbar-brand">
      <div id="top-navbar" class="container is-widescreen section p-5">
        <div class="columns is-mobile is-centered" style="width: 100%">
          <div id="main-logo" class="column">
            <a href="/" aria-current="page">
              <img
                src="../../../roelobeats/static/img/wavkits-black.png"
                width="130px"
                alt="wavkits.com logo"
                id="logo"
                class="cursor"
              />
            </a>
          </div>

          <!--SEARCHBAR-->

          <div id="search" class="column is-hidden-mobile">
            <div class="field">
              <div class="autocomplete control">
                <div class="control has-icons-right  is-clearfix">
                  <input type="text" autocomplete="off" aria-autocomplete="list" placeholder="Search for kits..." class="input is-rounded is-black">
                  <span class="icon is-right">
                    <i class="mdi mdi-magnify mdi-24px has-text-black"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!--SEARCH(PHONE) / CART / FAVOURITE ICONS -->

          <div id="icons" class="column has-text-right">

            <span class="icon is-large is-hidden-tablet is-clickable">
                <i class="mdi mdi-magnify mdi-36px has-text-black" style="z-index:999;"></i>
              </span>

            <span class="icon is-large">
              <a href="" target="_blank">
                <i
                  class="mdi mdi-heart-outline mdi-36px has-text-black"
                ></i>
              </a>
            </span>

            <span class="icon is-large">
              <a href="/cart" target="_blank">
                <i
                  class="mdi mdi-basket-outline mdi-36px has-text-black"
                ></i>
              </a>
            </span>
            <a>
              <span class="cart-badge">2</span>
            </a>
            
            <span class="icon is-large is-hidden-desktop is-clickable">
                <i class="mdi mdi-menu mdi-36px has-text-black"></i>
            </span>

          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="navbar-menu">
        <div class="navbar-start">
          <div id="navbar-items-wrapper" class="container is-widescreen section is-hidden-mobile">
            <div class="navbar-item has-dropdown is-hoverable">
              <a href="" aria-haspopup="true" tabindex="0" class="navbar-link is-arrowless">Pop</a>
              <div class="navbar-dropdown">
                <div class="container section py-1">
                  <div class="columns is-capitalized">
                    <div class="column is-3">
                      <a href="" class="navbar-item is-hidden-mobile px-0">
                        Indie pop
                      </a>
                      <a href="" class="navbar-item sub px-0">
                        Indie pop
                      </a>
                      <a href="" class="navbar-item sub px-0">
                        Indie pop
                      </a>
                      <a href="" class="navbar-item sub px-0">
                        Indie pop
                      </a>
                      <a href="" class="navbar-item sub px-0">
                        Indie pop
                      </a>
                    </div>
                    </div>
                  </div>
                </div>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a href="" aria-haspopup="true" tabindex="0" class="navbar-link is-arrowless">Hip Hop</a>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a href="" aria-haspopup="true" tabindex="0" class="navbar-link is-arrowless">House</a>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a href="" aria-haspopup="true" tabindex="0" class="navbar-link is-arrowless">Techno</a>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a href="" aria-haspopup="true" tabindex="0" class="navbar-link is-arrowless">Jazz</a>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a href="" aria-haspopup="true" tabindex="0" class="navbar-link is-arrowless">EDM</a>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a href="" aria-haspopup="true" tabindex="0" class="navbar-link is-arrowless">Drum and Bass</a>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a href="" aria-haspopup="true" tabindex="0" class="navbar-link is-arrowless">Cinematic</a>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a href="" aria-haspopup="true" tabindex="0" class="navbar-link is-arrowless">World</a>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a href="" aria-haspopup="true" tabindex="0" class="navbar-link is-arrowless">Free</a>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a href="" aria-haspopup="true" tabindex="0" class="navbar-link is-arrowless">SALE</a>
            </div>
          </div>
        </div>
      </div>
      <div clas="navbar-end">
      </div>
    </div>
  </nav>
</template>

<style lang="scss"></style>
