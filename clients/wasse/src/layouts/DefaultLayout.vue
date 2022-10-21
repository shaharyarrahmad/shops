<template>
  <div>
    <AppHeader :collections="$context.navbarCollections" />
    <div class="container is-widescreen section navbar-margin pb-6">
      <slot name="content" />
    </div>
    <div v-if="$slots.fullwidth" class="has-background-primary">
      <div class="container is-widescreen section">
        <slot name="fullwidth" />
      </div>
    </div>
    <div class="container is-widescreen section pt-5 pb-6">
      <slot name="content2" />
    </div>
    <div v-if="$slots.fullwidth" class="has-background-primary">
      <div class="container is-widescreen section">
        <slot name="newsletter" />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
  components: { AppHeader },
};
</script>
<style>
.navbar-margin {
  margin-top: 80px !important;
}
@media screen and (min-width: 1024px) {
  .navbar-margin {
    margin-top: 160px !important;
  }
}
</style>
