import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    grid: null,
    height: null,
    width: null
  },
  getters: {
    grid(state) {
      return state.grid
    },
    height(state) {
      return state.height
    },
    width(state) {
      return state.width
    },
    isGrid(state) {
      return state.grid !== null
    }
  },
  mutations: {
    SET_GRID_SIZE(state, { height, width }) {
      state.height = height
      state.width = width
    },
    SET_GRID_LAYOUT(state, grid) {
      state.grid = grid
    },
    SET_CELL_STATE(state, { rowI, cellI, action }) {
      state.grid[rowI][cellI].value = action
    }
  },
  actions: {
    createGrid({ commit }, { height, width }) {
      commit('SET_GRID_SIZE', { height, width })
      const grid = []
      // height = number of arrays
      for (let rowI = 0; rowI < height; rowI += 1) {
        const row = []
        for (let cellI = 0; cellI < width; cellI += 1) {
          row.push({ id: `${rowI}.${cellI}`, value: null })
        }
        grid.push(row)
      }
      commit('SET_GRID_LAYOUT', grid)
    },
    changeState({ commit }, { rowI, cellI, action }) {
      commit('SET_CELL_STATE', { rowI, cellI, action })
    }
  },
  modules: {}
})
