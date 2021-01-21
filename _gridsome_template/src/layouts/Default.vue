<template>
  <div style="font-family: 'Roboto mono', monospace;">
    <div class="grid-x grid-padding-x">
      <div class="cell show-for-large large-3"></div>
      <div class="cell small-12 large-6">
        <img src="/logo.png" alt="Pinelab.studio webshop logo" style="padding: 20px; width: 100%">
      </div>
      <div class="cell show-for-large large-3"></div>
    </div>

    <div class="grid-x grid-padding-x">
      <div class="cell show-for-large large-3"></div>
      <div class="cell small-12 large-6">
        <div class="container">
          <NavBar/>
          <slot/>
        </div>
      </div>
      <div class="cell show-for-large large-3"></div>
    </div>
  </div>
</template>
<script>
import {NavBar} from 'shared-components'

export default {
  components: {
    NavBar
  },
  meta: [
    {name: 'description', content: "Pinelab.studio demo webshop. Probeer het uit!"}
  ]
}
</script>