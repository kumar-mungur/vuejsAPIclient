import Vue from "vue";
import App from "./App.vue";
import { store } from "./store";

//Nprogress set up
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Add Bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//Add Vue Animate CSS
import "vue2-animate/dist/vue2-animate.min.css";

import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueRouter);

//Set up axios and base url
axios.defaults.baseURL = store.state.axios.baseUrl;
Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios;

import Routes from "./routes";

const router = new VueRouter({
  routes: Routes,
  mode: "history"
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: "login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: "dashboard"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  NProgress.done();
});

//Add pagination support for laravel data
Vue.component("pagination", require("laravel-vue-pagination"));

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store: store,
  router: router
}).$mount("#app");
