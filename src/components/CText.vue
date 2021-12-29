<template>
  <v-text-field
    prepend-icon=""
    filled
    color="green"
    :placeholder="placeholder"
    :label="label"
    :type="type"
    :rules="rules"
    :counter="counter"
    :value="value"
    :disabled="disabled"
    @change="$emit('change', $event)"
  ></v-text-field>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
    },
    type: {
      type: String,
      default: "text",
    },
    rules: {
      type: Array,
    },
    counter: {
      type: Number,
    },
    label: {
      type: String,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
