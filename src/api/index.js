import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Swal from "sweetalert2";

import storeError from "../modules/error/_store";

import store from "../store";

const Api = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL;
    this.setupHeaders();
    Vue.axios.interceptors.response.use(function(response) {
      return response;
    }, this.handleError.bind(this));

    const STORE_KEY_ERROR = "$_error";
    if (!(STORE_KEY_ERROR in store._modules.root._children)) {
      store.registerModule(STORE_KEY_ERROR, storeError);
    }
  },

  setupHeaders() {
    Vue.axios.defaults.headers.common["Content-Type"] = "application/json";
    Vue.axios.defaults.headers.common["Accept"] = "application/json";
    ["get", "post", "put", "patch"].forEach(function(method) {
      Vue.axios.defaults.headers[method]["Content-Type"] = "application/json";
    });
  },

  messageError(response, errorMsg, errorTitle = "") {
    Swal.fire({
      icon: "error",
      title: errorTitle,
      text: errorMsg,
      timer: 7000,
      showConfirmButton: false,
      customClass: {
        container: "handler-error",
      },
    });
  },

  checkResponse(response) {
    if (!response) {
      return {
        data: "",
        status: 500,
        statusText: "",
      };
    }
    return response;
  },

  async handleError(errRef) {
    if (!errRef.response) {
      return;
    }

    let response = errRef.response;
    let dataResponse = this.checkResponse(response);
    const code = dataResponse.status ? dataResponse.status : 0;
    var errorMsg = "";
    // let typeMessage = "warning";
    if (Object.prototype.hasOwnProperty.call(dataResponse.data, "message"))
      if (dataResponse.data.message) errorMsg = dataResponse.data.message;
    switch (code) {
      case 400:
        this.messageError(dataResponse, dataResponse.data.message);
        break;

      case 0:
      case 401:
      case 406:
        await store.dispatch(
          "$_error/setErrorsNotAcceptable",
          dataResponse.data
        );
        break;

      case 422:
        this.messageError(dataResponse, dataResponse.data.message);
        break;

      case 404:
        errorMsg = "Página não encontrada!";
        this.messageError(dataResponse, errorMsg);
        break;

      case 500:
      case 501:
        errorMsg = errorMsg ?? "Aguarde um pouco e tente novamente";
        this.messageError(dataResponse, errorMsg, "", "Erro interno.");
        break;
    }

    if (code === 406) {
      return new Promise((resolve, reject) => {
        reject(dataResponse);
      });
    }
  },

  async query(resource, data) {
    const promiseData = new Promise((resolve) => {
      const result = Vue.axios.get(resource, { params: data });
      resolve(result);
    });
    return promiseData;
  },

  async get(resource, slug = "") {
    const promiseData = new Promise((resolve) => {
      const result = Vue.axios.get(`${resource}/${slug}`);
      resolve(result);
    });
    return promiseData;
  },

  async post(resource, params) {
    const promiseData = new Promise((resolve) => {
      const result = Vue.axios.post(`${resource}`, JSON.stringify(params));
      return resolve(result);
    });
    return promiseData;
  },

  async postFormData(resource, params) {
    return new Promise((resolve) => {
      const result = Vue.axios.post(`${resource}`, params, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return resolve(result);
    });
  },

  async put(resource, id, params) {
    const promiseData = new Promise((resolve) => {
      const route = id ? `${resource}/${id}` : resource;
      const result = Vue.axios.put(route, JSON.stringify(params));
      return resolve(result);
    });
    return promiseData;
  },

  patch(resource, id, params) {
    return Vue.axios.patch(`${resource}/${id}`, JSON.stringify(params));
  },

  delete(resource, id) {
    const promiseData = new Promise((resolve) => {
      const result = Vue.axios.delete(`${resource}/${id}`);
      resolve(result);
    });
    return promiseData;
  },
};

export default Api;
