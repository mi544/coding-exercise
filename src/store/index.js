import Vue from 'vue'
import Vuex from 'vuex'
import { state, getters, mutations, actions } from './store'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
