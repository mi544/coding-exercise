// 🕵️🕵️🕵️ sleuth spic [py] 🕵️🕵️🕵️

// const style = wrapper.vm.showLabel(null)
// expect(style).toBe('cell')

import { shallowMount } from '@vue/test-utils'
import Grid from '../../Grid.vue'

const requiredComputed = {
  springsInProgress() {
    return false
  },
  grid() {
    return false
  },
  fullSpringsReach() {
    return false
  },
  springsDate() {
    return false
  }
}

const storeMock = {
  getters: {}
}

const storeMockWithDispatch = {
  ...storeMock,
  dispatch: jest.fn()
}

describe('Grid', () => {
  it('mounts successfully', () => {
    const wrapper = shallowMount(Grid, {
      mocks: { $store: storeMock },
      computed: requiredComputed
    })
    expect(wrapper.exists()).toBeTruthy()
  })
  it('matches snapshot', () => {
    const wrapper = shallowMount(Grid, {
      mocks: { $store: storeMock },
      computed: requiredComputed
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('showLabel method output', () => {
  it('returns `cell` class when `null` is passed', () => {
    const wrapper = shallowMount(Grid, {
      mocks: { $store: storeMock },
      computed: requiredComputed
    })
    const noStyle = wrapper.vm.showLabel(null)
    expect(noStyle).toBe('cell')
  })
  it('returns `cell rocks` class when `rocks` is passed', () => {
    const wrapper = shallowMount(Grid, {
      mocks: { $store: storeMock },
      computed: requiredComputed
    })
    const cellStyle = wrapper.vm.showLabel('rocks')
    expect(cellStyle).toBe('cell rocks')
  })
  it('returns `cell dig` class when `water` is passed (if `springsDate` is false)', () => {
    const wrapper = shallowMount(Grid, {
      mocks: { $store: storeMock },
      computed: requiredComputed
    })
    const cellStyle = wrapper.vm.showLabel('water')
    expect(cellStyle).toBe('cell dig')
  })
  it('returns `cell water` class when `water` is passed (if `springsDate` is true)', () => {
    const wrapper = shallowMount(Grid, {
      mocks: { $store: storeMock },
      computed: {
        ...requiredComputed,
        springsDate() {
          return true
        }
      }
    })
    const cellStyle = wrapper.vm.showLabel('water')
    expect(cellStyle).toBe('cell water')
  })
})
describe('changeState method output and error handling', () => {
  it('stops further execution when `springsInProgress` is true', () => {
    const event = { target: { dataset: { index: '1.2' } } }
    const wrapper = shallowMount(Grid, {
      mocks: { $store: storeMockWithDispatch },
      data: () => ({ actionInput: 'dig' }),
      computed: {
        ...requiredComputed,
        springsInProgress() {
          return true
        }
      }
    })
    wrapper.vm.changeState(event)
    expect(wrapper.vm.$store.dispatch).not.toHaveBeenCalled()
  })
  it('stops further execution and shows error when neither `dig` nor `rocks` is passed', () => {
    const event = { target: { dataset: { index: '1.2' } } }
    const wrapper = shallowMount(Grid, {
      mocks: { $store: storeMockWithDispatch },
      data: () => ({ actionInput: null }),
      computed: {
        ...requiredComputed
      }
    })
    wrapper.vm.changeState(event)
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith(
      'showError',
      'No option selected (dig or rocks)'
    )
  })
  it('dispatches `changeState` when proper input is passed', () => {
    const event = { target: { dataset: { index: '1.2' } } }
    const wrapper = shallowMount(Grid, {
      mocks: { $store: storeMockWithDispatch },
      data: () => ({ actionInput: 'rocks' }),
      computed: {
        ...requiredComputed
      }
    })
    wrapper.vm.changeState(event)
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('changeState', {
      rowI: '1',
      cellI: '2',
      action: 'rocks'
    })
  })
})
