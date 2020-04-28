import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

const Home = () => import("@/views/Home/Home.vue");
const EditNote = () => import("@/views/EditNote/EditNote.vue");
const NotFound = () => import("@/views/404/404.vue");

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: true
  },
  {
    path: "/edit/:id",
    name: "edit-note",
    component: EditNote,
    props: true
  },
  {
    path: "*",
    name: "404",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
