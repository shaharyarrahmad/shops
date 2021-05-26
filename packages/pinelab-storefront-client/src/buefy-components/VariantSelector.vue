<template>
  <div v-if="product.optionGroups.length > 0">
    <div v-for="group of product.optionGroups">
      <b-field>
        <b-select :placeholder="`${group.name}...`" v-on:input="select()"
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
      optionGroups: {}
    };
  },
  methods: {
    select() {
      const variant = this.product.variants.find(v => !!v.options.every(o => o.id === this.optionGroups[o.groupId]));
      if (variant) {
        this.$emit('select', variant);
      }
    }
  }
};
</script>