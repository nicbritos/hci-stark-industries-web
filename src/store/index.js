import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";

Vue.use(Vuex);

let deviceTypes = {
  light: {
    image: "/img/devices/lightbulb.svg"
  },
  ac: {
    image: "/img/devices/air-conditioner.svg"
  }
};

let regions = [],
  rooms = [],
  devices = [];

let plantaBaja = {
  id: "pbaja",
  name: "First Floor",
  rooms: []
};

let primerPiso = {
  id: "primerpiso",
  name: "Second Floor",
  rooms: []
};
regions.push(plantaBaja);
regions.push(primerPiso);

let comedor = {
  id: "cuarto1",
  name: "Comedor",
  devices: []
};
rooms.push(comedor);
plantaBaja.rooms.push(comedor);

let dormitorio = {
  id: "dormitorio1",
  name: "Dormitorio",
  devices: []
};
rooms.push(comedor);
primerPiso.rooms.push(dormitorio);

let luzComedor = {
  id: "1",
  type: deviceTypes.light,
  name: "Luz",
  color: "",
  on: false,
  brightness: 100,
  room: comedor
};
let ac = {
  id: "2",
  type: deviceTypes.ac,
  name: "AC",
  swing: {
    vertical: 0,
    horizontal: 0
  },
  mode: "cool",
  on: false,
  room: comedor
};
devices.push(ac);
devices.push(luzComedor);
comedor.devices.push(ac);
comedor.devices.push(luzComedor);

let routines = [
  {
    id: "1",
    name: "Llegando a casa",
    description: "Prende el AC a 24C frio del comedor",
    devices: [devices[1]],
    on: true
  },
  {
    id: "2",
    name: "Saliendo de casa",
    description: "Apaga el AC y la luz del comedor",
    devices: [devices[0], devices[1]],
    on: false
  }
];

let favouriteRoutines = [routines[0], routines[1]];

let favouriteDevices = [devices[0], devices[1]];

export default new Vuex.Store({
  modules: {
    user
  },
  // App global-access state for views and components.
  state: {
    loading: true,
    windowWidth: 0,
    ratingVisibility: false,
    devices: {
      items: devices,
      favourites: favouriteDevices
    },
    routines: {
      items: routines,
      favourites: favouriteRoutines
    },
    rooms: rooms,
    regions: regions,
    theme: "light"
  },
  // Store mutations in order to not modify the state directly.
  // Mutations cannot be called directly from a component. Instead, call an action.
  // Can't contain asynchronous operations.
  mutations: {
    WINDOW_WIDTH(state, width) {
      state.windowWidth = width;
    },
    TOGGLE_RATING(state) {
      state.ratingVisibility = !state.ratingVisibility;
    },
    SET_THEME(state, theme) {
      state.theme = theme;
    }
  },
  // Actions 'commit' mutations.
  // Can contain asynchronous operations.
  // 'Dispatch' to call an action.
  actions: {
    setWindowWidth({ commit }) {
      function commitWidth() {
        commit("WINDOW_WIDTH", window.innerWidth);
      }

      commitWidth();
      window.addEventListener("resize", commitWidth);
    },
    toggleRating({ commit }) {
      commit("TOGGLE_RATING");
    },
    setTheme({ commit }, theme) {
      let userPreferences = JSON.parse(localStorage.userPreferences);
      userPreferences.theme = theme;
      localStorage.userPreferences = JSON.stringify(userPreferences);

      commit("SET_THEME", theme);
    }
  },
  // Getters act as computed properties.
  getters: {
    minWidth: state => size => {
      return state.windowWidth < size;
    },
    maxWidth: state => size => {
      return state.windowWidth > size;
    },
    loading(state) {
      return state.loading;
    },
    ratingVisibility(state) {
      return state.ratingVisibility;
    },
    theme(state) {
      return state.theme;
    }
  }
});
