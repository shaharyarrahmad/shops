<template>
  <b-pagination
    class="is-primary"
    :total="total"
    v-model="currentPage"
    range-before="2"
    range-after="2"
    order="is-centered"
    size="default"
    :simple="false"
    :rounded="false"
    :per-page="itemsPerPage"
    icon-prev="chevron-left"
    icon-next="chevron-right"
    aria-next-label="Volgende pagina"
    aria-previous-label="Vorige pagina"
    aria-page-label="Pagina"
    aria-current-label="Huidige pagina"
    :page-input="false"
    page-input-position="is-input-right"
    debounce-page-input="100"
    @change="setPage()"
  >
  </b-pagination>
</template>
<script>
export default {
  props: ['total'],
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 12,
      items: [],
    };
  },
  methods: {
    setPage() {
      const start = this.itemsPerPage * (this.currentPage - 1);
      const end = start + this.itemsPerPage;
      this.$emit('change', { start, end });
    },
  },
};
</script>
