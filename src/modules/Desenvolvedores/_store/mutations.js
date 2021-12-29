const STORE_DESENVOLVEDORES = (state, data) => {
  state.desenvolvedores = data.data;
};

const STORE_DESENVOLVEDOR = (state, data) => {
  state.desenvolvedor = data.data;
};

export default {
  STORE_DESENVOLVEDORES,
  STORE_DESENVOLVEDOR,
};
