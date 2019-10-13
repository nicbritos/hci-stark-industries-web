import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Rooms from "@/views/Room.vue";
import Regions from "@/views/Regions.vue";
import Routines from "@/views/Routines.vue";
import NewRoutine from "@/views/NewRoutine.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Search from "@/views/Search";

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
    regionsWithId: {
      path: "/regions/:regionId",
      name: "regionsWithId",
      meta: {
        requiresAuth: false
      },
      component: Regions
    },
    rooms: {
      path: "/regions/:regionId/room/:rid",
      name: "devices",
      meta: {
        requiresAuth: false
      },
      component: Rooms
    },
    routines: {
      path: "/routines",
      name: "routines",
      meta: {
        requiresAuth: false
      },
      component: Routines
    },
    newRoutine: {
      path: "/routines/new",
      name: "newRoutine",
      meta: {
        requiresAuth: false
      },
      component: NewRoutine
    },

    about: {
      path: "/about",
      name: "about",
      component: About
    },
    "page-not-found": {
      path: "/page-not-found",
      name: "page-not-found",
      component: PageNotFound
    },
    search:{
      path: "/Search/:query",
      name:"Search",
      component: Search
    }
  },
  breadcrumbs: {
    about: {
      to: "/about",
      text: "About",
      disabled: false
    },

  }
};

export default routes;
