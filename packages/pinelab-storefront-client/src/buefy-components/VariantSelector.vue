<template>
  <div v-if="product.optionGroups.length > 0">
    <div v-for="group of product.optionGroups">
      <h3 class="has-text-weight-bold mb-2">{{ group.name }}</h3>

      <b-button
        v-for="option of group.options"
        :key="option.id"
        :aria-label="`${group.name} ${option.name}`"
        class="mr-2 mb-2"
        :class="{ 'is-primary': selectedOptions[group.id] === option.id }"
        @click="select(group.id, option.id)"
      >
        {{ option.name }}
      </b-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: { required: true },
    variant: { required: true },
  },
  data() {
    return {
      selectedVariant: undefined,
      selectedOptions: {},
    };
  },
  created() {
    this.selectedVariant = this.variant;
    this.selectedVariant.options.forEach((o) => {
      this.$set(this.selectedOptions, o.groupId, o.id);
      // this.selectedOptions[o.groupId] = o.id;
    });
  },
  methods: {
    select(groupId, optionId) {
      this.selectedOptions[groupId] = optionId;
      const variant = this.product.variants.find(
        (v) =>
          !!v.options.every((o) => this.selectedOptions[o.groupId] === o.id)
      );
      if (variant) {
        console.log(`Selected ${variant.name}`);
        this.$emit('select', variant);
      }
    },
    isSelected(groupId, optionId) {
      console.log('selected', this.selectedOptions[groupId] === optionId);
      return this.selectedOptions[groupId] === optionId;
    },
  },
};
</script>
