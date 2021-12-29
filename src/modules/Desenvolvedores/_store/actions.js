import Api from "../_api";

const index = async ({ commit }, params) => {
  const result = await Api.index(params);
  commit("STORE_DESENVOLVEDORES", result);
};

const get = async ({ commit }, param) => {
  const result = await Api.get(param);
  commit("STORE_DESENVOLVEDOR", result);
};

const post = async (commit, body) => {
  const result = await Api.post(body);
  return result;
};

const update = async (commit, params) => {
  const result = await Api.update(params);
  return result;
};

const remove = async (commit, param) => {
  const result = await Api.remove(param);
  return result
};

const getNiveis = async (commit, params) => {
  const result = await Api.getNiveis(params);
  return result.data;
};

export default {
  index,
  get,
  post,
  update,
  remove,
  getNiveis,
};
