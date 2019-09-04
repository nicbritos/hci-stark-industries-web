import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";

Vue.use(Vuex);

let deviceTypes = {
  light: {
    image: "@/assets/devices/lightbulb.svg"
  },
  ac: {
      image: "@/assets/devices/air-conditioner.svg"
  }
};

let rooms = [
  {
    id: "cuarto1",
    name: "Comedor",
    devices: []
  }
];

let devices = [
  {
    id: "1",
    type: "light",
    name: "Luz",
    color: "",
    on: false,
    brightness: 100,
    room: rooms[0]
  },
  {
    id: "2",
    type: "ac",
    name: "Aire Acondicionado",
    swing: {
      vertical: 0,
      horizontal: 0
    },
    mode: "cool",
    on: false,
    room: rooms[0]
  }
];

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

let favouriteRoutines = [
  routines[0],
  routines[1]
];

let favouriteDevices = [
  devices[0],
  devices[1]
];

let regions = [
  {
    id: "pbaja",
    name: "Planta baja",
    devices: []
  }
];

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
