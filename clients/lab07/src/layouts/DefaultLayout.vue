<template>
  <div>
    <template id="navbar">
      <b-navbar shadow fixed-top>
        <template #brand>
          <b-navbar-item id="logo" tag="router-link" :to="{ path: '/' }">
            <img src="logo.svg" />
          </b-navbar-item>
        </template>
        <template #end>
          <b-navbar-item id="category" class="mx-3"> SHOP </b-navbar-item>
          <b-navbar-item id="category" class="mx-3"> OVER ONS </b-navbar-item>
          <b-navbar-item id="category" class="mx-3"> CONTACT </b-navbar-item>
          <b-navbar-item id="category" class="mx-3">
            WINKELMAND(1)
          </b-navbar-item>
          <!-- <Basket class="wk-basket" 
              :vendure="$vendure" 
              :store="$store" 
              :emitter="$emitter" 

              @cart-button-clicked="
              $router.push('/cart/').catch((e) => {})
            " @checkout-button-clicked="
              $router.push('/checkout/').catch((e) => {})
            ">
              <i class="mdi mdi-basket-outline mdi-36px has-text-black"></i>
            </Basket> -->
        </template>
      </b-navbar>
    </template>

    <slot />

    <footer class="footer">
      <div class="content has-text-centered">
        <g-link to="https://www.instagram.com/lab_____07/" target="_blank">
          <span class="icon is-small">
            <i class="mdi mdi-instagram"> </i>
          </span>
        </g-link>
        • LAB07 • KVK 01177713 •
        <g-link to="mailto:info@saskiawagenvoortartwork.nl" target="_blank"
          >info@saskiawagenvoortartwork.nl</g-link
        >
        •
        <g-link to="/privacy.pdf" target="_blank">privacy</g-link>
        •
        <g-link to="/voorwaarden.pdf" target="_blank"
          >algemene voorwaarden en levering</g-link
        >
        •
        <g-link to="https://pinelab.studio/" target="_blank"
          >Made with ❤ by pinelab</g-link
        >
      </div>
    </footer>

    <!-- <div class="grid-x grid-padding-x">
      <div class="cell show-for-large large-3"></div>
      <div class="cell small-12 large-6">
        <div class="container">
          <div class="text-center footer-text">
            <a :href="global.instagram" target="_blank">
              <i class="fi-social-instagram" style="font-size: 1rem"></i>
            </a>
            • {{ global.name }} • KVK {{ global.kvk }} • {{ global.email }} •
            <a href="/privacy.pdf" target="_blank">privacy</a> •
            <a href="/voorwaarden.pdf" target="_blank"
              >algemene voorwaarden en levering</a
            >
            •
            <a href="https://pinelab.studio/" target="_blank"
              >Made with ❤ by pinelab</a
            >
          </div>
        </div>
      </div>
      <div class="cell show-for-large large-3"></div>
    </div> -->
  </div>
</template>

<script>
// import Basket from 'pinelab-storefront/lib/components/Basket';

// export default {
//   components: {
//     Basket,
//   }
// }
</script>
<style>
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

footer {
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  z-index: 30;
}

@media only screen and (max-width: 1023px) {
  .navbar-item,
  .navbar-link {
    display: inline !important;
  }
}
@media only screen and (max-width: 600px) {
  .navbar-item,
  .navbar-link {
    display: table !important;
  }
}

@media only screen and (min-width: 600px) {
  a.navbar-item#category {
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    height: 20px;
  }
}

@media only screen and (max-width: 600px) {
  a.navbar-item#category {
    top: 50%;
    height: 20px;
  }
}

a.navbar-item#category:hover {
  text-decoration: underline;
}
</style>
