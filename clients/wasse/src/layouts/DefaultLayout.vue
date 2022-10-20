<template>
  <div>
    <AppHeader :collections="$context.navbarCollections" />
    <div class="container is-widescreen section pt-5">
      <slot />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
export default {
  components: { AppHeader },
};
</script>
