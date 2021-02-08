/* eslint-disable import/prefer-default-export */

function infect({ rowI, cellI }, direction, grid, dimensions, commit) {
  switch (direction) {
    case 'left':
      if (cellI === 0) {
        // can't go to the left, it's the first cell
        break
      }
      if (grid[rowI][cellI - 1].value === null) {
        commit('SET_CELL_STATE', { rowI, cellI: cellI - 1, action: 'infection' })
      }
      break
    case 'right':
      if (cellI === dimensions.width - 1) {
        // can't go to the right, it's the last cell
        break
      }
      if (grid[rowI][cellI + 1].value === null) {
        commit('SET_CELL_STATE', { rowI, cellI: cellI + 1, action: 'infection' })
      }
      break
    case 'top':
      if (rowI === 0) {
        // can't go to the top, it's the first row
        break
      }
      if (grid[rowI - 1][cellI].value === null) {
        commit('SET_CELL_STATE', { rowI: rowI - 1, cellI, action: 'infection' })
      }
      break
    case 'bottom':
      if (rowI === dimensions.height - 1) {
        // can't go to the bottom, it's the last row
        break
      }
      if (grid[rowI + 1][cellI].value === null) {
        commit('SET_CELL_STATE', { rowI: rowI + 1, cellI, action: 'infection' })
      }
      break
    default:
  }
}

export { infect }
