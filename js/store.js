const store = new Vuex.Store({
  state: {
    count: 0
  },

  getters: {
    tenCount(state) {
      return state.count * 10;
    }
  },

  // sync, call with store.commit()
  mutations: {
    increment (state) {
      state.count++;
    }
  },

  // async, call with store.dispatch()
  actions: {
    lateIncrement({commit}) {
      setTimeout(() => commit('increment'), 2000);
    }
  }
});
