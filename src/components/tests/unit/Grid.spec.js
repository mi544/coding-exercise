// 🕵️🕵️🕵️ sleuth spic [py] 🕵️🕵️🕵️

// const style = wrapper.vm.showLabel(null)
// expect(style).toBe('cell')

import { shallowMount } from '@vue/test-utils'
import Grid from '../../Grid.vue'

const requiredComputed = {
  pandemicInProgress() {
    return false
  },
  grid() {
    return false
  },
  maximumInfection() {
    return false
  },
  pandemicDate() {
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
  it('returns `immune cell` class when `immune` is passed', () => {
    const wrapper = shallowMount(Grid, {
      mocks: { $store: storeMock },
      computed: requiredComputed
    })
    const immuneStyle = wrapper.vm.showLabel('immune')
    expect(immuneStyle).toBe('immune cell')
  })
  it('returns `infection cell` class when `infection` is passed', () => {
    const wrapper = shallowMount(Grid, {
      mocks: { $store: storeMock },
      computed: requiredComputed
    })
    const infectionStyle = wrapper.vm.showLabel('infection')
    expect(infectionStyle).toBe('infection cell')
  })
})
describe('changeState method output and error handling', () => {
  it('stops further execution when `pandemicInProgress` is true', () => {
    const event = { target: { dataset: { index: '1.2' } } }
    const wrapper = shallowMount(Grid, {
      mocks: { $store: storeMockWithDispatch },
      data: () => ({ actionInput: 'infection' }),
      computed: {
        ...requiredComputed,
        pandemicInProgress() {
          return true
        }
      }
    })
    wrapper.vm.changeState(event)
    expect(wrapper.vm.$store.dispatch).not.toHaveBeenCalled()
  })
  it('stops further execution and shows error when neither `infection` nor `immune` is passed', () => {
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
      'No option selected (infect or immune)'
    )
  })
  it('dispatches `changeState` when proper input is passed', () => {
    const event = { target: { dataset: { index: '1.2' } } }
    const wrapper = shallowMount(Grid, {
      mocks: { $store: storeMockWithDispatch },
      data: () => ({ actionInput: 'immune' }),
      computed: {
        ...requiredComputed
      }
    })
    wrapper.vm.changeState(event)
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('changeState', {
      rowI: '1',
      cellI: '2',
      action: 'immune'
    })
  })
})
