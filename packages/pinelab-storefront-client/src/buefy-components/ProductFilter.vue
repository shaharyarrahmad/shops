<template>
  <div>
    <b-taglist>
      <b-tag
        v-for="collection of collections"
        :key="collection.id"
        type="is-primary"
        size="is-medium"
        @close="false"
      >
        {{ collection.name }}
      </b-tag>
    </b-taglist>
    <p>Use buttons here? instead of tags</p>
  </div>
</template>
<script>
export default {
  props: {
    collections: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      selectedCollection: undefined,
    };
  },
};
</script>
