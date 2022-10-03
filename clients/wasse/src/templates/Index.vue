<template>
  <DefaultLayout>
    <h1>Welkom bij Wormenkwekerij Wasse</h1>

    <!---- example category cards --->
    <div class="columns">
      <template v-for="category of 5">
        <div class="column">
          <ExampleComponent :title="`Title ${category}`">
            <PopupImage
              small="https://wormenkwekerijwasse.nl/logo-wormenkwekerijwasse.png"
              large="https://wormenkwekerijwasse.nl/logo-wormenkwekerijwasse.png"
            />
          </ExampleComponent>
        </div>
      </template>
    </div>
  </DefaultLayout>
</template>
<script>
import ExampleComponent from '../components/ExampleComponent';
export default {
  components: { ExampleComponent },
};
</script>
