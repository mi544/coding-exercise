/* eslint-disable no-shadow */
import Vue from 'vue'
import { spreadWater } from '../utils'

export const state = {
  grid: null,
  previousGrid: null,
  height: null,
  width: null,
  springsInProgress: false,
  springsDate: null,
  error: null,
  errorTimer: null,
  fullSpringsReach: null
}

export const getters = {
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
  springsInProgress(state) {
    return state.springsInProgress
  },
  springsDate(state) {
    return state.springsDate
  },
  error(state) {
    return state.error
  },
  fullSpringsReach(state) {
    return state.fullSpringsReach
  }
}

export const mutations = {
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
  TOGGLE_SPRING_IN_PROGRESS(state, value) {
    state.springsInProgress = value
  },
  COPY_GRID_AND_STRINGIFY(state) {
    state.previousGrid = JSON.stringify(state.grid)
  },
  SET_SPRINGS_DATE(state, date) {
    state.springsDate = date
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_FULL_SPRINGS_REACH(state, springsState) {
    state.fullSpringsReach = springsState
  }
}

export const actions = {
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
  spreadNext({ state, commit }) {
    return new Promise((resolve) => {
      commit('COPY_GRID_AND_STRINGIFY')
      const dimensions = { width: this.state.width, height: this.state.height }
      const waterCells = []
      // gather all water cells coordinates
      state.grid.forEach((row, rowI) => {
        row.forEach((cell, cellI) => {
          if (cell.value === 'water') {
            waterCells.push({ rowI, cellI })
          }
        })
      })
      // spread water for all adjacent cells
      waterCells.forEach(({ rowI, cellI }) => {
        spreadWater({ rowI, cellI }, 'left', state.grid, dimensions, commit)
        spreadWater({ rowI, cellI }, 'right', state.grid, dimensions, commit)
        spreadWater({ rowI, cellI }, 'top', state.grid, dimensions, commit)
        spreadWater({ rowI, cellI }, 'bottom', state.grid, dimensions, commit)
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
