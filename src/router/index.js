import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/home/";
import Mine from "../views/mine/";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/mine",
    name: "Mine",
    component: Mine
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
