// import _ from "lodash";

const STORE_NIVEIS = (state, data) => {
  state.niveis = data.data;
};

const STORE_NIVEL = (state, data) => {
  state.nivel = data.data;
};

export default {
  STORE_NIVEIS,
  STORE_NIVEL,
};
