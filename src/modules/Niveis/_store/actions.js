import Api from "../_api";

const index = async ({ commit }, params) => {
  const result = await Api.index(params);
  commit("STORE_NIVEIS", result);
};

const get = async ({ commit }, param) => {
  const result = await Api.get(param);
  commit("STORE_NIVEL", result);
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
  await Api.remove(param);
};

export default {
  index,
  get,
  post,
  update,
  remove,
};
