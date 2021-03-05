<template>
  <div style="font-family: 'Roboto mono', monospace;">
    <div class="grid-x grid-padding-x">
      <div class="cell show-for-large large-3"></div>
      <div class="cell small-12 large-6">
        <img src="/logo.png" style="padding: 20px; width: 100%">
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
  metaInfo: {
    title: 'Daniël van de Haterd',
    meta: [
      {
        key: 'description',
        name: 'description',
        content: 'Artist Daniël van de Haterd. Art adventures. Abstract artist with a graffiti background.'
      }
    ],
  },
  components: {
    NavBar
  }
}
</script>