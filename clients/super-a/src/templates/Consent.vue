<template>
  <ClientOnly>
    <div v-if="!consentSet" class="footer consent-block p-3 px-6">
      <slot />
      <div class="has-text-right">
        <b-button @click="decline()" class="is-dark">{{ declineText }}</b-button>
        <b-button @click="accept()" class="is-success">{{ acceptText }}</b-button>
      </div>
    </div>
  </ClientOnly>
</template>
<script>
export default {
  props: ['acceptText', 'declineText', 'thankYouMessage'],
  data() {
    return {
      consentSet: false
    };
  },
  methods: {
    decline() {
      window.localStorage.setItem('consent_given', 'false');
      this.consentSet = true;
      this.$emit('declined');
    },
    accept() {
      window.localStorage.setItem('consent_given', (new Date()).toISOString());
      this.$emit('approved');
      this.consentSet = true;
    }
  },
  mounted() {
    const consent = window.localStorage.getItem('consent_given');
    if (consent === 'false') {
      this.consentSet = true;
      this.$emit('declined');
    } else if (consent) {
      this.consentSet = true;
      this.$emit('approved');
    } else if (!consent) {
      this.consentSet = false;
    }
  }
};
</script>
<style>
.consent-block {
  z-index: 99;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>