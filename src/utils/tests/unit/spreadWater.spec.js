/* eslint-disable no-undef */

import { spreadWater } from '../../spreadWater'

const commit = jest.fn()

const mockGrid = [
  [
    { id: '0.0', value: null },
    { id: '0.1', value: null },
    { id: '0.2', value: null }
  ],
  [
    { id: '1.0', value: null },
    { id: '1.1', value: null },
    { id: '1.2', value: null }
  ],
  [
    { id: '2.0', value: null },
    { id: '2.1', value: null },
    { id: '2.2', value: null }
  ]
]

const mockDimensions = { height: 3, width: 3 }

describe('spreadWater', () => {
  it('does not do anything when LEFT for TOP LEFT CELL', () => {
    const [rowI, cellI] = [0, 0]
    const direction = 'left'
    spreadWater({ rowI, cellI }, direction, mockGrid, mockDimensions, commit)
    expect(commit).not.toHaveBeenCalled()
  })
  it('does not do anything when RIGHT for TOP RIGHT CELL', () => {
    const [rowI, cellI] = [0, 2]
    const direction = 'right'
    spreadWater({ rowI, cellI }, direction, mockGrid, mockDimensions, commit)
    expect(commit).not.toHaveBeenCalled()
  })
  it('does not do anything when TOP for TOP RIGHT CELL', () => {
    const [rowI, cellI] = [0, 2]
    const direction = 'top'
    spreadWater({ rowI, cellI }, direction, mockGrid, mockDimensions, commit)
    expect(commit).not.toHaveBeenCalled()
  })
  it('does not do anything when BOTTOM for BOTTOM LEFT CELL', () => {
    const [rowI, cellI] = [2, 0]
    const direction = 'bottom'
    spreadWater({ rowI, cellI }, direction, mockGrid, mockDimensions, commit)
    expect(commit).not.toHaveBeenCalled()
  })
  it('spreads water left cell when LEFT for MIDDLE CELL', () => {
    const [rowI, cellI] = [1, 1]
    const direction = 'left'
    spreadWater({ rowI, cellI }, direction, mockGrid, mockDimensions, commit)
    expect(commit).toHaveBeenCalledWith('SET_CELL_STATE', {
      rowI,
      cellI: cellI - 1,
      action: 'water'
    })
  })
  it('spreads water right cell when RIGHT for MIDDLE CELL', () => {
    const [rowI, cellI] = [1, 1]
    const direction = 'right'
    spreadWater({ rowI, cellI }, direction, mockGrid, mockDimensions, commit)
    expect(commit).toHaveBeenCalledWith('SET_CELL_STATE', {
      rowI,
      cellI: cellI + 1,
      action: 'water'
    })
  })
  it('spreads water top cell when TOP for MIDDLE CELL', () => {
    const [rowI, cellI] = [1, 1]
    const direction = 'top'
    spreadWater({ rowI, cellI }, direction, mockGrid, mockDimensions, commit)
    expect(commit).toHaveBeenCalledWith('SET_CELL_STATE', {
      rowI: rowI - 1,
      cellI,
      action: 'water'
    })
  })
  it('spreads water bottom cell when BOTTOM for MIDDLE CELL', () => {
    const [rowI, cellI] = [1, 1]
    const direction = 'bottom'
    spreadWater({ rowI, cellI }, direction, mockGrid, mockDimensions, commit)
    expect(commit).toHaveBeenCalledWith('SET_CELL_STATE', {
      rowI: rowI + 1,
      cellI,
      action: 'water'
    })
  })
})
