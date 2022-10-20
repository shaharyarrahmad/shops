<template>
  <div>
    <AppHeader :collections="$context.navbarCollections" />
    <div class="container is-widescreen section p-2 pt-5 pb-6">
      <slot name="content" />
    </div>
    <div v-if="$slots.fullwidth" class="has-background-primary">
      <div class="container is-widescreen section">
        <slot name="fullwidth" />
      </div>
    </div>
    <div class="container is-widescreen section p-2 pt-5 pb-6">
      <slot name="content2" />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
export default {
  components: { AppHeader },
};
</script>
