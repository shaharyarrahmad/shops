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
    <div v-if="showNewsletter" class="has-background-primary">
      <div class="container is-widescreen section p-5">
        <div class="has-text-centered">
          <h3 class="has-text-white has-text-weight-bold">
            Meld je aan voor de wormen courant
          </h3>
          <p class="has-text-white has">
            Aanbiedingen, tips and tricks voor compostering en bodemverbetering
          </p>
        </div>
        <div class="column">
          <b-field position="is-centered" grouped group-multiline>
            <b-input placeholder="Naam" type="fname"> </b-input>
            <b-input placeholder="E-mailadres" type="email"> </b-input>
            <p class="control">
              <b-button
                type="is-dark-green is-shadowless is-hovered"
                label="Aanmelden"
              />
            </p>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
  components: { AppHeader },
  props: {
    showNewsletter: {
      default: true,
      type: Boolean,
    },
  },
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
