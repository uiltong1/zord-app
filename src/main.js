import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Api from "./api";
import mixin from "./mixin";

import CText from "./components/CText.vue";
import CTitle from "./components/CTitle.vue";
import CSelect from "./components/CSelect.vue";
import CTable from "./components/CTable.vue";
import CDate from "./components/CDate.vue";
import CConfirm from "./components/CConfirm.vue";

import "./plugins/vuetify-money";

Api.init();
Vue.component("CText", CText);
Vue.component("CTitle", CTitle);
Vue.component("CSelect", CSelect);
Vue.component("CTable", CTable);
Vue.component("CDate", CDate);
Vue.component("CConfirm", CConfirm);

Vue.mixin(mixin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
