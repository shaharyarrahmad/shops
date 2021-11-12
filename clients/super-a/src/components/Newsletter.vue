<template>
  <div class="container" style="max-width: 30rem;">
    <p class="mb-2">Subscribe to my newsletter to stay up to date!</p>
    <form action="https://studio.us7.list-manage.com/subscribe/post?u=c9829cf44cd2671865d2483c8&amp;id=08c3f6f397"
          method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate"
          target="_blank" novalidate>

      <div class="columns is-mobile">
        <div class="column">

          <b-field>
            <b-input type="email"
                     value=""
                     placeholder="Email"
                     name="EMAIL"
                     id="mce-EMAIL">
            </b-input>
          </b-field>

          <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
          <div style="position: absolute; left: -5000px;" aria-hidden="true">
            <input type="text"
                   name="b_c9829cf44cd2671865d2483c8_08c3f6f397"
                   tabindex="-1" value="">
          </div>
        </div>
        <div class="column is-narrow">
          <b-button tag="input"
                    id="mc-embedded-subscribe"
                    name="subscribe"
                    native-type="submit"
                    value="Subscribe" />
        </div>

      </div>
    </form>
  </div>
</template>