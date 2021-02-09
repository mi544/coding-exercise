/* eslint-disable no-undef */

import { infectCell } from '../../infectCell'

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

describe('infectCell', () => {
  it('does not do anything when LEFT for TOP LEFT CELL', () => {
    const [rowI, cellI] = [0, 0]
    const direction = 'left'
    infectCell({ rowI, cellI }, direction, mockGrid, mockDimensions, commit)
    expect(commit).not.toHaveBeenCalled()
  })
  it('does not do anything when RIGHT for TOP RIGHT CELL', () => {
    const [rowI, cellI] = [0, 2]
    const direction = 'right'
    infectCell({ rowI, cellI }, direction, mockGrid, mockDimensions, commit)
    expect(commit).not.toHaveBeenCalled()
  })
  it('does not do anything when TOP for TOP RIGHT CELL', () => {
    const [rowI, cellI] = [0, 2]
    const direction = 'top'
    infectCell({ rowI, cellI }, direction, mockGrid, mockDimensions, commit)
    expect(commit).not.toHaveBeenCalled()
  })
  it('does not do anything when BOTTOM for BOTTOM LEFT CELL', () => {
    const [rowI, cellI] = [2, 0]
    const direction = 'bottom'
    infectCell({ rowI, cellI }, direction, mockGrid, mockDimensions, commit)
    expect(commit).not.toHaveBeenCalled()
  })
  it('infects left cell when LEFT for MIDDLE CELL', () => {
    const [rowI, cellI] = [1, 1]
    const direction = 'left'
    infectCell({ rowI, cellI }, direction, mockGrid, mockDimensions, commit)
    expect(commit).toHaveBeenCalledWith('SET_CELL_STATE', {
      rowI,
      cellI: cellI - 1,
      action: 'infection'
    })
  })
  it('infects right cell when RIGHT for MIDDLE CELL', () => {
    const [rowI, cellI] = [1, 1]
    const direction = 'right'
    infectCell({ rowI, cellI }, direction, mockGrid, mockDimensions, commit)
    expect(commit).toHaveBeenCalledWith('SET_CELL_STATE', {
      rowI,
      cellI: cellI + 1,
      action: 'infection'
    })
  })
  it('infects top cell when TOP for MIDDLE CELL', () => {
    const [rowI, cellI] = [1, 1]
    const direction = 'top'
    infectCell({ rowI, cellI }, direction, mockGrid, mockDimensions, commit)
    expect(commit).toHaveBeenCalledWith('SET_CELL_STATE', {
      rowI: rowI - 1,
      cellI,
      action: 'infection'
    })
  })
  it('infects bottom cell when BOTTOM for MIDDLE CELL', () => {
    const [rowI, cellI] = [1, 1]
    const direction = 'bottom'
    infectCell({ rowI, cellI }, direction, mockGrid, mockDimensions, commit)
    expect(commit).toHaveBeenCalledWith('SET_CELL_STATE', {
      rowI: rowI + 1,
      cellI,
      action: 'infection'
    })
  })
})
