<template>
  <DefaultLayout>
    <template>
      <section class="hero is-justify-content-center is-flex-direction-row">
        <div class="tile is-ancestor">
          <div class="tile is-vertical">
            <div class="tile">
              <div class="tile is-parent">
                <article class="tile is-child">
                  <br />
                  <p class="title">{{ $context.content }}</p>
                  <br />
                  <div class="subtitle">
                    LAB07 bestaat uit de samenwerking tussen Erikjan Koopmans &
                    Saskia Wagenvoort. De samenwerking van LAB 07 is ontstaan
                    vanuit de wens om af en toe iets te maken wat niet van te
                    voren vast ligt. Iets dat ook even over de grenzen gaat van
                    ons eigen vrije werk. Doordat je de kracht, kennis en
                    inspiratie van ons beide gebruikt, kun je andere beelden
                    maken dan in je eentje. Samen componeren we het beeld op de
                    set, waarbij het niet belangrijk is wie wat heeft bedacht of
                    doet.
                  </div>
                </article>
              </div>
            </div>
            <div class="tile is-vertical">
              <br />
              <div class="tile">
                <div class="tile is-parent">
                  <article class="tile is-child">
                    <figure class="image is-4by3">
                      <img
                        src="https://bulma.io/images/placeholders/640x480.png"
                      />
                    </figure>
                  </article>
                </div>
                <div class="tile is-parent">
                  <article class="tile is-child">
                    <figure class="image is-4by3">
                      <img
                        src="https://bulma.io/images/placeholders/640x480.png"
                      />
                    </figure>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </DefaultLayout>
</template>

<style></style>

<script>
export default {
  props: ['title', 'description', 'images'],
  data() {
    return {};
  },
};
</script>
