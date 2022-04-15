<template>
  <Layout>
    <section class="has-text-centered">
      <b-button class="is-primary" tag="a" href="#buy"
        >Koop het e-boek voor
        <b>{{ $context.product.lowestPrice | euro }}</b>
      </b-button>
      <br />
      <br />
      <br />
    </section>

    <section id="about">
      <h2 class="has-text-centered">{{ $context.product.name }}</h2>
      <br />
      <div class="columns">
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
            <div
              class="is-family-secondary"
              v-html="$context.product.description"
            ></div>
          </div>
          <br />
          <br />
          <div id="buy">
            <h2 class="has-text-primary">
              Koop het e-boek hier voor
              {{ $context.product.lowestPrice | euro }}
            </h2>
            <p>Betaal online en ontvang het boek direct in je email!</p>
            <form v-on:submit="buy($event)">
              <b-field grouped label="Emailadres" label-position="on-border">
                <b-input
                  type="email"
                  v-model="emailAddress"
                  expanded
                  required
                ></b-input>
                <span class="control">
                  <b-button
                    tag="button"
                    native-type="submit"
                    type="is-primary"
                    :loading="loading"
                    >Koop het boek</b-button
                  >
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
      </div>
    </section>

    <section id="faq" class="mt-6">
      <h2 class="has-text-primary">FAQ / Veelgestelde vragen</h2>
      <p>
        <b>Klopt het dat ... ?</b><br />
        Nee!
      </p>
      <p>
        <b>Wat kost het boek?</b><br />
        Voor {{ $context.product.lowestPrice | euro }} ontvang je de PDF in je
        mail!
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
    async buy(e) {
      e.preventDefault();
      try {
        this.loading = true;
        if (this.$store?.activeOrder) {
          await this.$vendure.removeAllOrderLines();
        }
        await this.$vendure.addProductToCart(
          this.$context.product.variants[0].id,
          1
        );
        await this.$vendure.setCustomerForOrder({
          firstName: this.emailAddress,
          lastName: 'e-book',
          emailAddress: this.emailAddress,
        });
        await this.$vendure.setOrderShippingAddress({
          fullName: this.emailAddress,
          streetLine1: 'E-book dummy address',
          countryCode: 'nl',
        });
        const redirect = await this.$vendure.createMolliePaymentIntent(
          'mollie-payment-op'
        );
        this.loading = false;
        window.location.replace(redirect);
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
