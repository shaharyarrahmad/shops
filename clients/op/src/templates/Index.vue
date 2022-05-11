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
      <h2 class="has-text-centered is-size-4">
        {{ $context.product.variants[0].name }}
      </h2>
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
                  id="email"
                  name="email"
                  autocomplete="on"
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

                <b-tooltip
                  label="Je betaalt veilig met iDeal"
                  position="is-bottom"
                >
                  <img
                    src="/img/ideal.svg"
                    alt="Veilig betalen met iDeal"
                    class="is-shadowless"
                    style="height: 40px; opacity: 0.7"
                  />
                </b-tooltip>
              </b-field>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="mt-6">
      <h2 class="has-text-primary">FAQ / Meest gestelde vragen</h2>
      <p>
        <b>Staan er ook vegetarische recepten in het e-book?</b><br />
        80% procent van de recepten is vegetarisch.
      </p>
      <p>
        <b>Kun je het e-book ook ruilen?</b><br />
        Nee, dat is niet mogelijk, gekocht is gekocht.
      </p>
      <p>
        <b>Wat als ik het e-book heb gekocht, maar geen e-mail heb ontvangen?</b
        ><br />
        Dat zou vervelend zijn. Check ook altijd even je spam en mail anders
        naar <ClickableEmail />.
      </p>
      <p>
        <b>Is het boek ook in printversie te krijgen?</b><br />
        Tot nu toe is het boek alleen te downloaden.
      </p>
      <p>
        <b
          >Ik zie een spelfoutje en ik kan niet slapen voordat ik dat gemeld
          heb, wat moet ik doen?</b
        ><br />
        O jee, dat kan natuurlijk gebeuren. Laat je horen via
        <ClickableEmail />.
      </p>
      <p>
        <b>Ik heb nog een vraag, maar die staat hier niet tussen.</b><br />
        Mail dan naar <ClickableEmail />.
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
      orderPreparation: undefined,
    };
  },
  methods: {
    async buy(e) {
      e.preventDefault();
      try {
        this.loading = true;
        await this.prepareOrder();
        await this.$vendure.setCustomerForOrder({
          firstName: this.emailAddress,
          lastName: 'e-book',
          emailAddress: this.emailAddress,
        });
        console.log(`Added customer`);
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
    async prepareOrder() {
      await this.$vendure.getActiveOrder();
      if (this.$store?.activeOrder) {
        await this.$vendure.removeAllOrderLines();
        console.log('Removed previous orderlines');
      }
      // If no active order or no items
      await this.$vendure.addProductToCart(
        this.$context.product.variants[0].id,
        1
      );
      console.log('Added 1 ebook to cart');
      if (!this.$store?.activeOrder?.shippingAddress?.streetLine1) {
        await this.$vendure.setOrderShippingAddress({
          fullName: this.emailAddress,
          streetLine1: 'E-book',
          countryCode: 'nl',
        });
        console.log('Setting address');
      }
      console.log('Prepared order');
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
