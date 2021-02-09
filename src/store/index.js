import Vue from 'vue'
import Vuex from 'vuex'

import { infect } from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    grid: null,
    previousGrid: null,
    height: null,
    width: null,
    pandemicInProgress: false,
    pandemicDate: null,
    error: null,
    errorTimer: null,
    maximumInfection: null
  },
  getters: {
    grid(state) {
      return state.grid
    },
    previousGrid(state) {
      return state.previousGrid
    },
    height(state) {
      return state.height
    },
    width(state) {
      return state.width
    },
    isGrid(state) {
      return state.grid !== null
    },
    pandemicInProgress(state) {
      return state.pandemicInProgress
    },
    pandemicDate(state) {
      return state.pandemicDate
    },
    error(state) {
      return state.error
    },
    maximumInfection(state) {
      return state.maximumInfection
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
      // state.grid[rowI][cellI].value = action
      Vue.set(state.grid[rowI][cellI], 'value', action)
    },
    TOGGLE_PANDEMIC_IN_PROGRESS(state, value) {
      state.pandemicInProgress = value
    },
    COPY_GRID_AND_STRINGIFY(state) {
      state.previousGrid = JSON.stringify(state.grid)
    },
    SET_PANDEMIC_DATE(state, date) {
      state.pandemicDate = date
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    SET_MAXIMUM_INFECTION(state, infectionState) {
      state.maximumInfection = infectionState
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
      return new Promise((resolve) => {
        commit('COPY_GRID_AND_STRINGIFY')
        const dimensions = { width: this.state.width, height: this.state.height }
        const infectedCells = []
        // gather all infected cells coordinates
        state.grid.forEach((row, rowI) => {
          row.forEach((cell, cellI) => {
            if (cell.value === 'infection') {
              infectedCells.push({ rowI, cellI })
            }
          })
        })
        // infect all adjacent cells
        infectedCells.forEach(({ rowI, cellI }) => {
          infect({ rowI, cellI }, 'left', state.grid, dimensions, commit)
          infect({ rowI, cellI }, 'right', state.grid, dimensions, commit)
          infect({ rowI, cellI }, 'top', state.grid, dimensions, commit)
          infect({ rowI, cellI }, 'bottom', state.grid, dimensions, commit)
        })
        // check if any changes were made and return the result
        resolve(JSON.stringify(state.grid) === state.previousGrid)
      })
    },
    showError({ state, commit }, error) {
      clearTimeout(state.errorTimer)
      commit('SET_ERROR', error)
      state.errorTimer = setTimeout(() => commit('SET_ERROR', null), 5 * 1000)
    }
  }
})
