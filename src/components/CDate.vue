<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        filled
        color="green"
        v-model="computedDateFormatted"
        :label="label"
        persistent-hint
        append-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        :rules="rules"
        :disabled="disabled"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      :disabled="disabled"
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>
<script>
export default {
  props: {
    label: {
      typeo: String,
    },
    value: {
      type: String,
    },
    rules: {
      type: Array,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.value) {
      this.date = this.value;
    }
  },
  data: () => ({
    date: "",
    dateFormatted: "",
    menu: false,
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
      this.$emit("change", this.date);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>