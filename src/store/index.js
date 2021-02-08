import Vue from 'vue'
import Vuex from 'vuex'

import { infect } from '../utils'

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
      // height = number of rows
      for (let rowI = 0; rowI < height; rowI += 1) {
        const row = []
        // width = number of cells in every row
        for (let cellI = 0; cellI < width; cellI += 1) {
          row.push({ id: `${rowI}.${cellI}`, value: null })
        }
        grid.push(row)
      }
      commit('SET_GRID_LAYOUT', grid)
    },
    changeState({ state, commit }, { rowI, cellI, action }) {
      if (state.grid[rowI][cellI].value === action) {
        commit('SET_CELL_STATE', { rowI, cellI, action: null })
        return
      }
      commit('SET_CELL_STATE', { rowI, cellI, action })
    },
    infectNext({ state, commit }) {
      const dimensions = { width: this.state.width, height: this.state.height }
      const infectedCells = []
      // gather all infected cells' coordinates
      state.grid.forEach((row, rowI) => {
        row.forEach((cell, cellI) => {
          if (cell.value === 'infection') {
            infectedCells.push({ rowI, cellI })
          }
        })
      })
      console.log('found all infected cells')
      // infect all adjacent cells
      infectedCells.forEach(({ rowI, cellI }) => {
        infect({ rowI, cellI }, 'left', state.grid, dimensions, commit)
        infect({ rowI, cellI }, 'right', state.grid, dimensions, commit)
        infect({ rowI, cellI }, 'top', state.grid, dimensions, commit)
        infect({ rowI, cellI }, 'bottom', state.grid, dimensions, commit)
      })
    }
  }
})
