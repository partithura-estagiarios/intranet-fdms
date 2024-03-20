import { createRouter, createWebHistory } from "vue-router";
import { useUsers } from "../stores";
import routes from "~pages";

const history = createWebHistory();

export const router = createRouter({
  history,
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
