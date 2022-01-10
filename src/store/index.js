import Vue from 'vue'
import Vuex from 'vuex'
//import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user:null,
  },
  mutations: {
    setUser(state,payload){
      state.user = payload
    },
  },
  actions: {
    setterUser(store,user){
      store.commit('setUser',user)
    },  
  },
  modules: {
  }
})