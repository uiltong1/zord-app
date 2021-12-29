import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../Layout/BasicLayout"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("../modules/Home"),
      },
      {
        path: "niveis",
        name: "Niveis",
        component: () => import("../modules/Niveis"),
      },
      {
        path: "niveis/criar",
        name: "NiveisCriar",
        props: true,
        component: () => import("../modules/Niveis/Create"),
      },
      {
        path: "niveis/:id/editar",
        name: "NiveisEdit",
        props: true,
        component: () => import("../modules/Niveis/Create"),
      },
      {
        path: "niveis/:id",
        name: "NiveisConsultar",
        props: true,
        component: () => import("../modules/Niveis/Create"),
      },
      {
        path: "desenvolvedores",
        name: "Desenvolvedores",
        component: () => import("../modules/Desenvolvedores"),
      },
      {
        path: "desenvolvedores/criar",
        name: "DesenvolvedoresCriar",
        props: true,
        component: () => import("../modules/Desenvolvedores/Create"),
      },
      {
        path: "desenvolvedores/:id/editar",
        name: "DesenvolvedoresEdit",
        props: true,
        component: () => import("../modules/Desenvolvedores/Create"),
      },
      {
        path: "desenvolvedores/:id",
        name: "DesenvolvedoresConsultar",
        props: true,
        component: () => import("../modules/Desenvolvedores/Create"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
