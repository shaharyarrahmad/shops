<template>
  <div>

    <table class="table order-table is-fullwidth">
      <tbody>
      <tr v-for="line of activeOrder.lines">
        <td style="width: 64px;">
          <p class="image is-64x64">
            <img :src="line.featuredAsset.thumbnail" />
          </p>
        </td>
        <td>
          <p>
            <strong>{{ line.productVariant.product.name }}</strong>
            <br>
            <span class="has-text-grey">{{ line.productVariant.name }}</span>
          </p>
        </td>
        <td>
          <b-field>
            <b-numberinput size="is-small">
            </b-numberinput>
          </b-field>
        </td>
      </tr>
      </tbody>
    </table>

    <article class="media" v-for="line of activeOrder.lines">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="line.featuredAsset.thumbnail" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ line.productVariant.product.name }}</strong>
            <br>
            <span class="has-text-grey">{{ line.productVariant.name }}</span>
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-reply"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-retweet"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-heart"></i></span>
            </a>
          </div>
        </nav>
      </div>
      <div class="media-right">
        <button class="delete"></button>
      </div>
    </article>
  </div>
</template>
<script>
import { Order } from "pinelab-common/dist/src/generated/graphql";

export default {
  props: {
    activeOrder: {
      type: Order,
      required: true
    }
  },
  computed: {
    lines() {
      this.activeOrder?.lines;
    }
  }
};
</script>
<style>
.order-table td {
  padding-left: 0;
}
</style>
