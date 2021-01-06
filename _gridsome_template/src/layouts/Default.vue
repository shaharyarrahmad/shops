<template>
  <div>
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
          <div class="grid-x small-up-2 medium-up-2 large-up-2 grid-padding-x">
            <div class="cell">
              <g-link v-if="$context.previousPage" class="button" :to="$context.previousPage"><</g-link>
            </div>
            <div class="cell text-right">
              <HeaderCart></HeaderCart>
            </div>
          </div>
          <slot/>
        </div>
      </div>
      <div class="cell show-for-large large-3"></div>
    </div>
  </div>
</template>
<script>
import {HeaderCart} from 'shared-components'
export default {
  components: {
    HeaderCart
  }
}
</script>