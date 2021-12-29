<template>
  <div>
    <div v-if="loadingPage" class="d-flex flex-row justify-sm-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <c-title :title="title" />
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col>
                <c-text
                  :label="'Nome'"
                  :rules="[(v) => !!v || 'Nome é obrigatório']"
                  required
                  :value="form.nm_nivel"
                  :disabled="view"
                  @change="form.nm_nivel = $event"
                ></c-text>
              </v-col>
            </v-row>

            <v-col class="d-flex flex-row justify-end">
              <v-btn
                v-if="!view"
                color="primary"
                class="mr-4"
                :disabled="!valid"
                :loading="loading"
                @click="submit"
              >
                Salvar
              </v-btn>
              <v-btn color="error" class="mr-4" @click="$router.back()">
                Voltar
              </v-btn>
            </v-col>
          </v-container>
        </v-form>
      </v-card>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import store from "./_store";
export default {
  beforeCreate() {
    const STORE = "$_niveis";
    if (!(STORE in this.$store._modules.root._children))
      this.$store.registerModule(STORE, store);
  },
  async created() {
    this.checkRoute();
    this.form = {};
    if (this.$route.params.id) {
      await this.get(this.$route.params.id);
      this.form = Object.assign(this.form, this.nivel);
    }
    this.loadingPage = false;
  },
  computed: {
    ...mapGetters({
      nivel: "$_niveis/nivel",
    }),
  },
  data: () => ({
    valid: true,
    title: "",
    view: false,
    form: {
      nm_nivel: "",
    },

    loading: false,
    loadingPage: true,
  }),
  methods: {
    ...mapActions({
      send: "$_niveis/post",
      get: "$_niveis/get",
      update: "$_niveis/update",
    }),
    async submit() {
      if (!this.$refs.form.validate()) {
        return false;
      }
      try {
        this.loading = true;
        if (this.$route.params.id) {
          this.form.id = this.$route.params.id;
          await this.update(this.form);
        } else {
          await this.send(this.form);
        }
        this.loading = false;
        this.saveSuccess("Registro salvo com sucesso!", "/niveis");
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    checkRoute() {
      switch (this.$route.name) {
        case "NiveisCriar":
          this.view = false;
          this.title = "Cadastrar Nível";
          break;
        case "NiveisEdit":
          this.view = false;
          this.title = "Editar Nível";
          break;
        case "NiveisConsultar":
          this.view = true;
          this.title = "Consultar Nível";
          break;
      }
    },
  },
};
</script>