<template>
  <Layout>
    <template #content>
      <h1 class="title is-1">{{ $context.page.title }}</h1>
      <br />

      <div class="tile is-ancestor">
        <div class="tile is-vertical is-6">
          <div class="tile">
            <div class="tile is-parent">
              <article class="tile is-child">
                <p class="title">This awesome project</p>
                <p>This project, some description here. Materials and stuff. Some more text, to demonstrate the layout.
                  And more text. Paint stuff.</p>
                <br>
                <figure class="image is-square">
                  <img src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg">
                </figure>
                <br>
              </article>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child">
              <p class="title">Another project</p>
              <p>This project, some description here. Materials and stuff. Some more text, to demonstrate the layout.
                And more text. Paint stuff.</p>
              <br>
              <figure class="image is-square">
                <img src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg">
              </figure>
              <br>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child">
            <p class="title">Another project 15</p>
            <p>This project, some description here. Materials and stuff. Some more text, to demonstrate the layout. And
              more text. Paint stuff.</p>
            <br>

              <div>
                <figure class="image">
                  <img src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg">
                </figure>
              </div>
              <div class="columns mt-2 is-5 is-mobile">
                <div class="column is-one-third">
                  <figure class="image is-square">
                    <img src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg">
                  </figure>
                </div>
                <div class="column is-one-third">
                  <figure class="image is-square">
                    <img src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg">
                  </figure>
                </div>
                <div class="column is-one-third">
                  <figure class="image is-square">
                    <img src="https://storage.googleapis.com/pinelab-shops-assets/preview/dc/pinkpantherweb__preview.jpg">
                  </figure>
                </div>
              </div>

            <br>
          </article>
        </div>
      </div>


    </template>
  </Layout>
</template>
<script>
export default {};
</script>
