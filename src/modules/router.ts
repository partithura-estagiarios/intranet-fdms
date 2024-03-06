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

router.beforeEach((to, from, next) => {
  const userStorage = useUsers();
  if (!userStorage.stateUser.token && to.path !== "/login") {
    next("/login");
  }
  if (userStorage.stateUser.token && to.path === "/login") {
    next(false);
  }
  next();
});
