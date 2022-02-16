<template>
  <div>
    <template v-for="collection of collections">
      <g-link
        v-if="isSelected(collection)"
        :to="`${noCollectionUrl.length > 0 ? noCollectionUrl : '/'}`"
        :key="collection.id"
        class="button is-primary mr-2 mb-2"
      >
        <span> {{ collection.name }} </span
        ><span class="icon is-small"><i class="mdi mdi-close-thick"></i></span>
      </g-link>
      <g-link
        v-else
        :to="`${collectionUrlPrefix || noCollectionUrl}/${collection.slug}/`"
        :key="collection.id"
        class="button is-outlined mr-2 mb-2"
      >
        {{ collection.name }}
      </g-link>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    collections: {
      required: true,
      type: Array,
    },
    selectedCollection: { type: Object },
    noCollectionUrl: {
      required: true,
    },
    collectionUrlPrefix: {
      required: false,
    },
  },
  methods: {
    isSelected(collection) {
      return collection.id === this.selectedCollection?.id;
    },
  },
};
</script>
