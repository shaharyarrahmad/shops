<template>
  <section id="breadcrumb">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li v-for="(url, name, i) of crumbs" :key="url" :class="isLast(i)">
          <g-link :to="url">{{ name }}</g-link>
        </li>
      </ul>
    </nav>
  </section>
</template>
<script>
export default {
  props: {
    crumbs: {
      required: true,
      type: Object,
    },
  },
  methods: {
    isLast(i) {
      return i === Object.keys(this.crumbs).length - 1 ? 'is-active' : '';
    },
  },
};
</script>
