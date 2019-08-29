import Vue from "vue";
import Router from "vue-router";
import Bookmarks from "./views/Bookmarks.vue";
import Routines from "./views/Routines.vue";
import Accessories from "./views/Accessories.vue";
import Rooms from "./views/Rooms.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Recovery from "./views/Recovery.vue";
import store from "./store/index";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "bookmarks",
      meta: {
        requiresAuth: false
      },
      component: Bookmarks
    },
    {
      path: "/rooms",
      name: "rooms",
      meta: {
        requiresAuth: false
      },
      component: Rooms
    },
    {
      path: "/accessories",
      name: "accessories",
      meta: {
        requiresAuth: false
      },
      component: Accessories
    },
    {
      path: "/routines",
      name: "routines",
      meta: {
        requiresAuth: false
      },
      component: Routines
    },
    {
      path: "/register",
      name: "register",
      meta: {
        requiresUnAuth: true
      },
      component: Register
    },
    {
      path: "/login",
      name: "login",
      meta: {
        requiresUnAuth: true
      },
      component: Login
    },
    {
      path: "/recovery",
      name: "recovery",
      meta: {
        requiresUnAuth: true
      },
      component: Recovery
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (store.getters.loggedIn != null) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.loggedIn) {
        next("/login");
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.requiresUnAuth)) {
      if (store.getters.loggedIn) {
        next("/");
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

export default router;
