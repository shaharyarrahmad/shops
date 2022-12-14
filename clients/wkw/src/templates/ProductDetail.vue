<template>
  <DefaultLayout #content>
    <br />
    <div class="tile is-ancestor">
      <div class="tile is-vertical">
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child">
              <ProductImages :product="$context.product" :variant="variant" />
            </article>
          </div>
          <div class="tile is-parent is-vertical">
            <article class="tile is-child">
              <p class="title has-text-black mb-0">
                {{ $context.product.name }}
              </p>
              <b-rate
                class="my-3"
                v-model="rate"
                :icon-pack="packs"
                :icon="icons"
                :max="maxs"
                :size="sizes"
                :locale="locale"
                :show-score="score"
                :custom-text="custom"
                :show-text="text"
                :texts="texts"
                :rtl="isRtl"
                :spaced="isSpaced"
                :disabled="isDisabled"
              >
              </b-rate>
              <p class="subtitle has-text-black">
                {{ variant.priceWithTax | euro }}
              </p>
              <ReadMoreDescription
                :description="$context.product.description"
                :max-length="60"
                :collapse="1"
              />
            </article>
            <article class="tile is-child">
              <VariantSelector
                :product="$context.product"
                :variant="variant"
                v-on:select="selectedVariant = $event"
              />
              <br />
              <b-button
                class="is-primary is-fullwidth"
                :loading="isLoading"
                :disabled="isSoldOut"
                v-on:click="buy()"
                >{{ isSoldOut ? 'Uitverkocht' : 'In winkelmand' }}
              </b-button>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child">
            <p
              id="full-description"
              class="subtitle content"
              v-html="$context.product.description"
            ></p>
          </article>
        </div>
      </div>
    </div>

    <!-- <div class="tile is-ancestor">
      <div class="column">
        <ProductImages :product="$context.product" :variant="variant" />
      </div>
      <div class="column">
        <div class="has-text-black is-size-1">{{ $context.product.name }}</div>
        <div class="is-size-5 mb-4">{{ variant.priceWithTax | euro }}</div>
        <VariantSelector
          :product="$context.product"
          :variant="variant"
          v-on:select="selectedVariant = $event"
        />
        <br />
        <b-button
          class="is-primary is-fullwidth"
          :loading="isLoading"
          :disabled="isSoldOut"
          @click="buy()"
          >{{ isSoldOut ? 'Sold out' : 'Buy' }}
        </b-button>
        <br />
        <div v-html="$context.product.description"></div>
      </div>
    </div> -->
  </DefaultLayout>
</template>
<script>
import ProductImages from 'pinelab-storefront/lib/components/ProductImages';
import VariantSelector from 'pinelab-storefront/lib/components/VariantSelector';
import ReadMoreDescription from '@/components/ReadMoreDescription';
import { buy, getMetaInfo, hydrate, isOutOfStock } from 'pinelab-storefront';

export default {
  components: { ProductImages, VariantSelector, ReadMoreDescription },
  computed: {
    variant() {
      return (
        this.selectedVariant ||
        this.$context?.product.variants.find((v) => !isOutOfStock(v)) ||
        this.$context?.product.variants[0]
      );
    },
    isSoldOut() {
      return isOutOfStock(this.variant);
    },
  },
  data() {
    return {
      selectedVariant: undefined,
      isLoading: false,
      rate: 4,
      maxs: 5,
      sizes: 'default',
      packs: 'mdi',
      icons: 'star',
      score: false,
      custom: 'reviews',
      text: false,
      texts: [],
      isRtl: false,
      isSpaced: false,
      isDisabled: true,
      locale: undefined, // Browser locale
    };
  },
  metaInfo() {
    return getMetaInfo(this.$context.product);
  },
  async mounted() {
    console.log(this.$context.product);
    await hydrate(this.$context.product, this.$vendure);
  },
  methods: {
    async buy() {
      this.isLoading = true;
      await buy(this.variant, {
        vendure: this.$vendure,
        emitter: this.$emitter,
      });
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
