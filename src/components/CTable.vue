<template>
  <div>
    <v-container class="d-flex flex-row justify-end">
      <v-btn rounded class="actions" color="primary" @click="$emit('search')"
        >Buscar</v-btn
      >
      <v-btn rounded class="actions" color="primary" @click="$emit('create')"
        >Novo</v-btn
      >
      <v-btn rounded class="actions" color="primary" @click="$router.push('/')"
        >Voltar</v-btn
      >
    </v-container>
    <div>
      <v-data-table
        :headers="headers"
        :items="items"
        :page="page"
        :loading="loading"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        loading-text="Carregando..."
        hide-default-footer
        class="list elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            v-if="isExistProperty(actions, 'consult.enable')"
            class="mr-2"
            @click="$emit('consultItem', item)"
          >
            {{ isExistIcon(actions, "consult.icon") }}
          </v-icon>

          <v-icon
            v-if="isExistProperty(actions, 'edit.enable')"
            class="mr-2"
            @click="$emit('editItem', item)"
          >
            {{ isExistIcon(actions, "edit.icon") }}
          </v-icon>

          <v-icon
            v-if="isExistProperty(actions, 'edit.enable')"
            @click="$emit('deleteItem', item)"
          >
            {{ isExistIcon(actions, "delete.icon") }}
          </v-icon>
        </template>
        <template
          v-for="headerValue in this.customItems"
          v-slot:[`item.${headerValue}`]="{ item }"
        >
          <slot :name="headerValue" v-bind:item="item" />
        </template>
      </v-data-table>
    </div>
    <div class="text-center">
      <v-pagination v-model="page" :length="pages()" circle></v-pagination>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  props: {
    id: {
      type: String,
    },
    headers: {
      type: Array,
    },
    items: {
      type: Array,
    },
    length: {
      type: Number,
    },
    actions: {
      type: Object,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    pageIndex: {
      type: Number,
    },
    customItems: {
      type: Array,
    },
  },
  data() {
    return {
      page: 1,
      options: {},
      sortDesc: true,
      sortBy: "",
    };
  },

  watch: {
    page(newVal) {
      this.$emit("pagination", newVal);
    },
    sortBy: {
      handler(newVal) {
        this.$emit("sort", {
          sortDesc: this.sortDesc,
          sortBy: newVal,
        });
      },
      deep: true,
    },
    sortDesc: {
      handler(newVal) {
        this.$emit("sort", {
          sortDesc: newVal,
          sortBy: this.sortBy,
        });
      },
      deep: true,
    },
    pageIndex: {
      handler(newVal) {
        this.page = newVal;
      },
      deep: true,
    },
  },

  methods: {
    pages() {
      if (!this.length) return Math.ceil(this.items.length / 10);
      else return this.length;
    },
    isExistProperty(item, action) {
      return _.get(item, action);
    },
    isExistIcon(item, icon) {
      var value = "";
      switch (icon) {
        case "edit.icon":
          value = _.get(item, icon);
          if (!value) value = "mdi-pencil";
          break;
        case "consult.icon":
          value = _.get(item, icon);
          if (!value) value = "mdi-eye";
          break;
        case "delete.icon":
          value = _.get(item, icon);
          if (!value) value = "mdi-delete";
          break;
      }
      return value;
    },
  },
};
</script>
<style>
.v-data-table list theme--light .v-data-table__wrapper .v-data-table-header {
  background-color: blue;
  color: white !important;
  border-radius: 5px !important;
}

.text-center {
  margin-top: 30px;
}

.actions {
  margin-left: 2px !important;
}
</style>