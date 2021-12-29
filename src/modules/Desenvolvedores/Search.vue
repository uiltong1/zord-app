<template>
  <v-card>
    <v-system-bar class="d-flex flex-row justify-end" color="primary">
      <v-icon color="#FFFFFF" @click="$emit('close', false)">mdi-close</v-icon>
    </v-system-bar>
    <v-container>
      <v-row>
        <v-col cols="8">
          <c-text
            label="Pesquisa"
            name="search"
            @change="filter.search = $event"
          ></c-text>
        </v-col>
        <v-col cols="4">
          <c-select
            :items="campos"
            :text="'name'"
            :value="'value'"
            label="Campo"
            :clearable="true"
            @change="filter.fieldSearch = $event"
          ></c-select>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      campos: [
        { name: "Nome", value: "nm_desenvolvedor" },
        { name: "Sexo", value: "ds_sexo" },
        { name: "Idade", value: "nu_idade" },
        { name: "Data de Nascimento", value: "dt_nascimento" },
        { name: "Hobby", value: "ds_hobby" },
        { name: "Nível", value: "nm_nivel" },
      ],
      filter: {
        fieldSearch: "",
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