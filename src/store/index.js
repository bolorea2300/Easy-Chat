import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  state: {
    user: null,
  },
  mutations: {
    info(state, value) {
      state.user = value;
    },
    reset(state) {
      state.user = null;
    },
  },
  actions: {},
  modules: {},
});
