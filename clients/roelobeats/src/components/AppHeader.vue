<template>
  <!--NAVBAR-->
  <nav
    role="navigation"
    aria-label="main navigation"
    class="navbar-expand-lg is-fixed-top sticky-top has-navbar-centered"
    style="background-color: #966fa4"
  >
    <div class="navbar-brand">
      <div id="top-navbar" class="container is-widescreen section">
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
              <div class="autocomplete control has-icons-right is-clearfix">
                <input
                  type="text"
                  class="input is-rounded is-black is-outlined cursor"
                  style="width: 400px"
                  placeholder="Search for kits..."
                />

                <div class="cursor">
                  <span class="icon cursor is-right">
                    <i
                      class="mdi mdi-arrow-right-circle mdi-48px has-text-black cursor"
                    ></i>
                  </span>
                </div>
              </div>
            </div>
            <span class="icon is-medium is-hidden-tablet is-clickable">
              <button class="has-text-black mdi mdi-magnify mdi-36px"></button>
            </span>
          </div>

          <!--CART/FAVOURITE ICONS -->

          <div id="icons" class="column has-text-right">
            <span class="icon is-large">
              <a href="" target="_blank">
                <i
                  class="mdi mdi-heart-outline mdi-36px has-text-black cursor"
                ></i>
              </a>
            </span>

            <span class="icon is-large">
              <a href="" target="_blank">
                <i
                  class="mdi mdi-basket-outline mdi-36px has-text-black cursor"
                ></i>
              </a>
            </span>
            <a>
              <span class="cart-badge">0</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss"></style>
