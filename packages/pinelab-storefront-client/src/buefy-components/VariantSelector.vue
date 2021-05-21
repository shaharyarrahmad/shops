<template>
  <div v-if="product.optionGroups.length > 0">
    <div v-for="group of product.optionGroups">
      <b-field :label="group.name">
        <b-select v-on:input="select()"
                  v-model="optionGroups[group.id]">
          <option
            v-for="option of group.options"
            :value="option.id"
            :key="option.id">
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: { required: true }
  },
  data() {
    return {
      optionGroups: {},
      variant: {}
    };
  },
  methods: {
    select() {
      this.variant = this.product.variants.find(v => !!v.options.every(o => o.id === this.optionGroups[o.groupId]));
      this.variant.options.forEach(o => this.optionGroups[o.groupId] = o.id);
      console.log(this.optionGroups)
      this.$emit('select', this.variant);
    }
  },
  watch: {
    product() {
      this.variant = this.product?.variants[0];
    }
  }
};
</script>