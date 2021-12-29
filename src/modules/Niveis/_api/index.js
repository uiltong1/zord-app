import Api from "../../../api";
const route = "niveis";

const index = async (query) => {
  const result = await Api.query(`${route}`, query);
  return result;
};

const get = async (param) => {
  const result = await Api.query(`${route}/${param}`);
  return result;
};

const post = async (body) => {
  const result = await Api.post(`${route}`, body);
  return result.data;
};

const update = async (params) => {
  const result = await Api.put(route, params.id, params);
  return result;
};

const remove = async (param) => {
  const result = await Api.delete(`${route}`, param);
  return result.data;
};

export default {
  index,
  get,
  post,
  update,
  remove,
};
