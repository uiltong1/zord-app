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
                  :rules="[
                    (v) => !!v || 'Nome é obrigatório',
                    (v) =>
                      v.length <= 80 ||
                      'Nome não pode conter mais que 80 caracteres',
                  ]"
                  required
                  :value="form.nm_desenvolvedor"
                  :disabled="view"
                  @change="form.nm_desenvolvedor = $event"
                ></c-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <c-text
                  :type="'Number'"
                  :label="'Idade'"
                  :rules="[(v) => !!v || 'Idade é obrigatório']"
                  :value="form.nu_idade"
                  required
                  :disabled="view"
                  @change="form.nu_idade = $event"
                ></c-text>
              </v-col>
              <v-col>
                <c-date
                  :label="'Data de Nascimento'"
                  :value="form.dt_nascimento"
                  :disabled="view"
                  @change="form.dt_nascimento = $event"
                  :rules="[(v) => !!v || 'Data de Nascimento é obrigatório']"
                ></c-date>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <c-select
                  :items="sexos"
                  label="Sexo"
                  :value="form.ds_sexo"
                  :clearable="true"
                  :disabled="view"
                  @change="form.ds_sexo = $event"
                ></c-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <c-select
                  :items="niveis"
                  label="Nível"
                  :text="'nm_nivel'"
                  :itemValue="'co_nivel'"
                  :value="form.co_nivel"
                  :clearable="true"
                  :disabled="view"
                  @change="form.co_nivel = $event"
                ></c-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <c-text
                  :label="'Hobby'"
                  :rules="[
                    (v) => !!v || 'Hobby é obrigatório',
                    (v) =>
                      v.length <= 256 ||
                      'Hobby não pode conter mais que 256 caracteres',
                  ]"
                  required
                  :value="form.ds_hobby"
                  :disabled="view"
                  @change="form.ds_hobby = $event"
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
    const STORE = "$_desenvolvedores";
    if (!(STORE in this.$store._modules.root._children))
      this.$store.registerModule(STORE, store);
  },
  async created() {
    this.checkRoute();
    this.form = {};
    this.niveis = await this.getNiveis({
      limit: -1,
    });
    if (this.$route.params.id) {
      await this.get(this.$route.params.id);
      this.form = Object.assign(this.form, this.desenvolvedor);
    }
    this.loadingPage = false;
  },
  computed: {
    ...mapGetters({
      desenvolvedor: "$_desenvolvedores/desenvolvedor",
    }),
  },
  data: () => ({
    valid: true,
    title: "",
    view: false,
    form: {
      nm_desenvolvedor: "",
      ds_sexo: "",
      dt_nascimento: "",
      nu_idade: "",
      ds_hobby: "",
      co_nivel: "",
    },
    sexos: ["Masculino", "Feminino"],
    niveis: [],
    loading: false,
    loadingPage: true,
  }),
  methods: {
    ...mapActions({
      send: "$_desenvolvedores/post",
      get: "$_desenvolvedores/get",
      update: "$_desenvolvedores/update",
      getNiveis: "$_desenvolvedores/getNiveis",
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
        await this.saveSuccess(
          "Registro salvo com sucesso!",
          "/desenvolvedores"
        );
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    checkRoute() {
      switch (this.$route.name) {
        case "DesenvolvedoresCriar":
          this.view = false;
          this.title = "Cadastrar Desenvolvedor";
          break;
        case "DesenvolvedoresEdit":
          this.view = false;
          this.title = "Editar Desenvolvedor";
          break;
        case "DesenvolvedoresConsultar":
          this.view = true;
          this.title = "Consultar Desenvolvedor";
          break;
      }
    },
  },
};
</script>