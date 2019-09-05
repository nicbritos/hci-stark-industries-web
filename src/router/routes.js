import Home from "@/views/Home.vue";
import Users from "@/views/Users.vue";
import Login from "@/views/Login.vue";
import About from "@/views/About.vue";
import Regions from "@/views/Regions.vue";
import Register from "@/views/Register.vue";
import Recovery from "@/views/Recovery.vue";
import PageNotFound from "@/views/PageNotFound.vue";

const routes = {
  router: {
    home: {
      path: "/",
      name: "home",
      meta: {
        requiresAuth: false
      },
      component: Home
    },
    regions: {
      path: "/regions",
      name: "regions",
      meta: {
        requiresAuth: false
      },
      component: Regions
    },
    users: {
      path: "/users",
      name: "users",
      meta: {
        requiresAuth: false
      },
      component: Users
    },
    register: {
      path: "/register",
      name: "register",
      meta: {
        requiresUnAuth: true
      },
      component: Register
    },
    login: {
      path: "/login",
      name: "login",
      meta: {
        requiresUnAuth: true
      },
      component: Login
    },
    recovery: {
      path: "/recovery",
      name: "recovery",
      meta: {
        requiresUnAuth: true
      },
      component: Recovery
    },
    about: {
      path: "/about",
      name: "about",
      meta: {
        requiresUnAuth: true
      },
      component: About
    },
    "page-not-found": {
      path: "/page-not-found",
      name: "page-not-found",
      component: PageNotFound
    }
  },
  breadcrumbs: {
    about: {
      to: "/about",
      text: "About",
      disabled: false
    },
    recovery: {
      to: "/recovery",
      text: "Recovery",
      disabled: false
    },
    login: {
      to: "/login",
      text: "Login",
      disabled: false
    },
    register: {
      to: "/register",
      text: "Register",
      disabled: false
    }
  }
};

export default routes;
