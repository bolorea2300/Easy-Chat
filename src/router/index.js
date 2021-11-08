import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";
import Index from "../views/Index.vue";
import Home from "../views/Home.vue";
import Use from "../views/Use.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { authOnly: true },
  },
  {
    path: "/use",
    name: "Use",
    component: Use,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

function isLoggedIn() {
  return store.state.user;
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authOnly)) {
    if (!isLoggedIn()) {
      next("/");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guestOnly)) {
    if (isLoggedIn()) {
      next("/home");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
