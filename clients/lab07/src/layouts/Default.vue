<template>
  <div>
    <template id="navbar">
      <b-navbar shadow>
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
        </template>
      </b-navbar>
    </template>
  </div>
</template>

<script></script>
<style>
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

a.navbar-item#category {
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  height: 20px;
}

a.navbar-item#category:hover {
  text-decoration: underline;
}
</style>
