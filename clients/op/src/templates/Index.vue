<template>
  <Layout>
    <section class="has-text-centered">
      <b-button class="is-primary is-large" tag="a" href="#buy"
        >Koop het e-boek voor
        <b>{{ $context.product.lowestPrice | euro }}</b>
      </b-button>
      <br />
      <br />
      <br />
    </section>

    <section id="about" class="columns">
      <div class="column">
        <PopupImage
          :small="$context.product.featuredAsset.preview"
          :alt="$context.product.name"
          :large="$context.product.featuredAsset.preview"
          class="mb-4"
        />
        <div class="columns is-mobile">
          <div class="column" v-for="asset of $context.product.assets">
            <PopupImage
              :small="asset.thumbnail"
              :alt="$context.product.name"
              :large="asset.preview"
              class="mb-4"
            />
          </div>
        </div>
      </div>

      <div class="column">
        <div class="description">
          <h2>{{ $context.product.name }}</h2>
          <div
            class="is-family-secondary"
            v-html="$context.product.description"
          ></div>
        </div>
        <br />
        <br />
        <h2 class="has-text-primary">
          Koop het e-boek hier voor {{ $context.product.lowestPrice | euro }}
        </h2>
        <div id="buy">
          <p>
            Vul je emailadres in, reken af en ontvang het boek direct in je
            email!
          </p>
          <form v-on:submit="buy()">
            <b-field grouped label="Emailadres" label-position="on-border">
              <b-input type="email" v-model="emailAddress" expanded></b-input>
              <span class="control">
                <b-button
                  tag="input"
                  native-type="submit"
                  value="Koop het boek"
                  type="is-primary"
                  :loading="loading"
                />
              </span>
            </b-field>
            <img
              src="/img/mollie.png"
              alt="Veilig betalen via Mollie"
              class="is-shadowless"
              style="height: 50px; opacity: 0.7"
            />
          </form>
        </div>
      </div>
    </section>

    <section id="faq">
      <h2 class="has-text-primary">FAQ / Veelgestelde vragen</h2>
      <p>
        <b>Klopt het dat ... ?</b><br />
        Nee!
      </p>
    </section>

    <br />
    <br />
  </Layout>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      emailAddress: undefined,
    };
  },
  methods: {
    async buy() {
      try {
        this.loading = true;
        if (!this.emailAddress) {
          this.showError(`Vul een geldig emailadres in`);
          return;
        }
        // TODO empty cart
        // Add 1 to cart
        await this.$vendure.setCustomerForOrder({
          firstName: this.emailAddress,
          lastName: 'e-book',
          emailAddress: this.emailAddress,
        });
        await this.$vendure.setOrderShippingAddress(address);
        await this.$vendure.setLowestShippingMethod();
      } catch (e) {
        this.showError(`Er is iets misgegaan, neem contact met ons op...`);
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
    showError(message) {
      this.$buefy.snackbar.open({
        duration: 5000,
        message,
        type: 'is-danger',
        position: 'is-bottom',
      });
    },
  },
};
</script>
<style></style>
