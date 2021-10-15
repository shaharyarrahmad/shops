<template>
  <Layout>
    <template #content>
      <h1 class="title">Tattoos by Ben de Boef</h1>
      <br>
      <div class="columns is-multiline is-mobile">
        <div
          v-for="tattoo of $context.tattoos"
          class="column is-6-mobile is-3-desktop is-3-tablet ">
          <PopupImage
            :small="getSquareImage(tattoo.image.id)"
            :alt="tattoo.image.title"
            :large="getDefaultImage(tattoo.image.id)"
          />
        </div>
      </div>

      <br>
      <div class="has-text-centered">
      <h2>Checkout my instagram for more tattoos</h2>
        <br/>
      <a :href="$context.global.instagram" target="_blank">
        <b-icon icon="instagram" size="is-large"></b-icon>
      </a>
      <br>
      <br>
      <br>
      <a href="/nazorg-tattoo.pdf" target="_blank">Read our tattoo aftercare instructions</a>
      </div>
    </template>
  </Layout>
</template>
<script>
export default {};
</script>
