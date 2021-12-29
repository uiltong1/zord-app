<template>
  <v-card>
    <v-system-bar class="d-flex flex-row justify-end" color="primary">
      <v-icon color="#FFFFFF" @click="$emit('close', false)">mdi-close</v-icon>
    </v-system-bar>
    <v-container>
      <v-row>
        <v-col cols="12">
          <c-text
            label="Pesquisa"
            name="search"
            @change="filter.search = $event"
          ></c-text>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      campos: [{ name: "Nome", value: "nm_nivel" }],
      filter: {
        search: null,
      },
    };
  },
  watch: {
    filter: {
      handler() {
        this.$emit("setFilter", this.filter);
      },
      deep: true,
    },
  },
};
</script>