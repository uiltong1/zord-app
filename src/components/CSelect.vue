<template>
  <v-select
    filled
    color="green"
    :items="items"
    :value="value"
    :item-text="text"
    :item-value="itemValue"
    :placeholder="placeholder"
    :label="label"
    :rules="rules"
    :clearable="clearable"
    :disabled="disabled"
    @change="$emit('change', $event)"
  ></v-select>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
    },
    value: {
      type: [String, Number],
    },
    text: {
      type: String,
    },
    itemValue: {
      type: [String, Number],
    },
    placeholder: {
      type: String,
    },
    label: {
      type: String,
    },
    rules: {
      type: Array,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>