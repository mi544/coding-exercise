import { shallowMount } from '@vue/test-utils'
import PandemicSimulator from '../../PandemicSimulator.vue'

// defining required properties to mock them later
const requiredComputed = {
  pandemicInProgress() {
    return false
  },
  error() {
    return false
  },
  isGrid() {
    return false
  }
}

const storeMock = {
  getters: {}
}

// 🕵️
const storeMockWithDispatch = {
  ...storeMock,
  dispatch: jest.fn()
}

describe('PandemicSimulator', () => {
  it('mounts successfully', () => {
    const wrapper = shallowMount(PandemicSimulator, {
      mocks: { $store: storeMock },
      computed: requiredComputed
    })
    expect(wrapper.exists()).toBeTruthy()
  })
  it('matches snapshot', () => {
    const wrapper = shallowMount(PandemicSimulator, {
      mocks: { $store: storeMock },
      computed: requiredComputed
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
