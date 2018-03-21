import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    messages: []
  },
  mutations: {
    setToken (state, token) {
      state.token = token ? `Bearer ${token}` : null;
      state.isUserLoggedIn = !!(token);
    },
    setUser (state, user) {
      state.user = user;
    },
    addMessage (state, message) {
      state.messages.push(message);
    },
    removeMessage (state, message) {
      state.messages.splice(message, 1);
    },
    initStore (state) {
      console.log(state);
      if (localStorage.getItem('store')) {
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))));
      }
    }
  },
  actions: {
    addMessage ({commit}, message) {
      const messageItem = {...message, key: new Date().getTime()};
      commit('addMessage', messageItem);
      setTimeout(() => {
        commit('removeMessage', messageItem);
      }, 5000);
    }
  }
});
