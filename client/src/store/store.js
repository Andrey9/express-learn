import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token ? `Bearer ${token}` : null;
      state.isUserLoggedIn = !!(token);
    },
    setUser (state, user) {
      state.user = user;
    }
  }
});

export default store;
