<template>
  <div>
    <c-title :title="'Níveis'" />

    <div>
      <search
        v-if="search"
        @setFilter="setFilter"
        @close="search = $event"
      ></search>
    </div>
    <div>
      <c-table
        :headers="headers"
        :items="data"
        :length="niveis.last_page"
        :actions="actions"
        :loading="loadingTable"
        :id="'co_nivel'"
        :pageIndex="page"
        :customItems="['desenvolvedores']"
        @editItem="editItem($event)"
        @deleteItem="deleteItem($event)"
        @selected="selected = $event"
        @search="survey()"
        @delete="remove()"
        @create="create()"
        @consultItem="consultItem($event)"
        @pagination="page = $event"
        @sort="sort($event)"
      >
        <template v-slot:desenvolvedores="{ item }">
          {{ item.desenvolvedores.length }}
        </template>
      </c-table>
      <c-confirm
        message="Deseja excluir o registro?"
        :dialog="actionRemove"
        :loading="loading"
        @positive="excluded()"
        @negative="noExcluded()"
      />
    </div>
  </div>
</template>
<script>
import store from "./_store";
import Search from "./Search.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { Search },
  data() {
    return {
      sortBy: "",
      sortDesc: true,
      page: 1,
      loadingTable: false,
      loading: false,
      search: false,
      actionRemove: false,
      removeItem: "",
      data: [],
      headers: [
        {
          text: "Nome",
          value: "nm_nivel",
        },
        {
          text: "Desenvolvedores",
          value: "desenvolvedores",
          sortable: false,
        },
        { text: "", value: "actions", sortable: false },
      ],
      actions: {
        edit: {
          enable: true,
        },
        delete: {
          enable: true,
        },
        consult: {
          enable: true,
        },
      },
      filters: {},
    };
  },
  beforeCreate() {
    const STORE = "$_niveis";
    if (!(STORE in this.$store._modules.root._children))
      this.$store.registerModule(STORE, store);
  },

  async created() {
    this.init();
  },

  computed: {
    ...mapGetters({
      niveis: "$_niveis/niveis",
    }),
  },

  watch: {
    page: {
      async handler(newVal) {
        await this.searchNiveis(newVal);
      },
      deep: true,
    },
  },

  methods: {
    ...mapActions({
      getNiveis: "$_niveis/index",
      remove: "$_niveis/remove",
    }),
    async init() {
      this.loadingTable = true;
      await this.getNiveis();
      this.data = this.niveis.data;
      this.loadingTable = false;
    },
    setFilter(event) {
      this.filters = Object.assign(this.filters, event);
    },
    editItem(item) {
      this.$router.push(`niveis/${item.co_nivel}/editar`);
    },
    consultItem(item) {
      this.$router.push(`niveis/${item.co_nivel}`);
    },
    deleteItem(item) {
      this.removeItem = item.co_nivel;
      this.actionRemove = true;
    },
    async excluded() {
      try {
        this.loading = true;
        if (this.removeItem !== undefined) {
          await this.remove(this.removeItem);
          this.actionRemove = false;
          await this.saveSuccess("Nível removido com sucesso!");
          await this.searchNiveis(this.page);
          this.loading = false;
        }
      } catch (error) {
        this.actionRemove = false;
        this.loading = false;
        console.log(error);
      }
    },
    noExcluded() {
      this.removeItem = "";
      this.actionRemove = false;
    },
    async survey() {
      if (!this.search) this.search = !this.search;
      else {
        this.searchNiveis();
      }
    },
    async sort(event) {
      this.filters.field = event.sortBy ? this.sortBy : null;
      this.filters.order = event.sortDec ? "desc" : "asc";
      await this.searchNiveis(this.page);
    },
    async searchNiveis(page = 1) {
      this.data = [];
      this.loadingTable = true;
      this.page = page;
      this.filters.page = page;
      await this.getNiveis(this.filters);
      if (this.niveis.current_page > this.niveis.last_page)
        this.page = this.niveis.last_page;
      else {
        this.data = this.niveis.data;
        this.loadingTable = false;
      }
    },
    create() {
      this.$router.push({ name: "NiveisCriar" });
    },
  },
};
</script>
