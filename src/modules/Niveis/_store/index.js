import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  niveis: [],
  nivel: [],
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
