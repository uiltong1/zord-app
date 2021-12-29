<template>
  <div>
    <c-title :title="'Desenvolvedores'" />
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
        :length="desenvolvedores.last_page"
        :actions="actions"
        :loading="loadingTable"
        :id="'co_desenvolvedor'"
        :pageIndex="page"
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
          value: "nm_desenvolvedor",
        },
        {
          text: "Sexo",
          value: "ds_sexo",
        },
        {
          text: "Idade",
          value: "nu_idade",
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
    const STORE = "$_desenvolvedores";
    if (!(STORE in this.$store._modules.root._children))
      this.$store.registerModule(STORE, store);
  },

  async created() {
    this.init();
  },

  computed: {
    ...mapGetters({
      desenvolvedores: "$_desenvolvedores/desenvolvedores",
    }),
  },

  watch: {
    page: {
      async handler(newVal) {
        await this.searchDesenvolvedores(newVal);
      },
      deep: true,
    },
  },

  methods: {
    ...mapActions({
      getDesenvolvedores: "$_desenvolvedores/index",
      remove: "$_desenvolvedores/remove",
    }),
    async init() {
      this.loadingTable = true;
      await this.getDesenvolvedores();
      this.data = this.desenvolvedores.data;
      this.loadingTable = false;
    },
    setFilter(event) {
      this.filters = Object.assign(this.filters, event);
    },
    editItem(item) {
      this.$router.push(`desenvolvedores/${item.co_desenvolvedor}/editar`);
    },
    consultItem(item) {
      this.$router.push(`desenvolvedores/${item.co_desenvolvedor}`);
    },
    deleteItem(item) {
      this.removeItem = item.co_desenvolvedor;
      this.actionRemove = true;
    },
    async excluded() {
      try {
        this.loading = true;
        if (this.removeItem !== undefined) {
          await this.remove(this.removeItem);
          this.actionRemove = false;
          await this.saveSuccess("Desenvolvedor removido com sucesso!");
          await this.searchDesenvolvedores();
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.actionRemove = false;
        this.loading = false;
      }
    },
    noExcluded() {
      this.removeItem = "";
      this.actionRemove = false;
    },
    async survey() {
      if (!this.search) this.search = !this.search;
      else {
        this.searchDesenvolvedores();
      }
    },
    async sort(event) {
      this.filters.field = event.sortBy ? this.sortBy : null;
      this.filters.order = event.sortDec ? "desc" : "asc";
      await this.searchDesenvolvedores(this.page);
    },
    async searchDesenvolvedores(page = 1) {
      this.data = [];
      this.loadingTable = true;
      this.page = page;
      this.filters.page = page;
      await this.getDesenvolvedores(this.filters);
      if (this.desenvolvedores.current_page > this.desenvolvedores.last_page)
        this.page = this.desenvolvedores.last_page;
      else {
        this.data = this.desenvolvedores.data;
        this.loadingTable = false;
      }
    },
    create() {
      this.$router.push({ name: "DesenvolvedoresCriar" });
    },
  },
};
</script>
