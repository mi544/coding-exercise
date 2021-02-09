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

// 🕵️🕵️
const storeMockWithDispatchAndCommit = {
  ...storeMockWithDispatch,
  commit: jest.fn()
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

describe('PandemicSimulator error handler', () => {
  // displays error if height and width are not integers
  it('displays error if height and width are floats', () => {
    const wrapper = shallowMount(PandemicSimulator, {
      mocks: { $store: storeMockWithDispatch },
      data: () => ({
        heightInput: 0.5,
        widthInput: 0.5
      }),
      computed: requiredComputed
    })
    wrapper.vm.createGrid()
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith(
      'showError',
      'Please provide width and height'
    )
  })
  it('displays error if height and width are > 128', () => {
    const wrapper = shallowMount(PandemicSimulator, {
      mocks: { $store: storeMockWithDispatch },
      data: () => ({
        heightInput: 130,
        widthInput: 130
      }),
      computed: requiredComputed
    })
    wrapper.vm.createGrid()
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith(
      'showError',
      'Number provided is too big, please provide a number less than 128'
    )
  })
  it('displays error if height and width are < 0', () => {
    const wrapper = shallowMount(PandemicSimulator, {
      mocks: { $store: storeMockWithDispatch },
      data: () => ({
        heightInput: -5,
        widthInput: -5
      }),
      computed: requiredComputed
    })
    wrapper.vm.createGrid()
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith(
      'showError',
      'Number provided is too small, please provide a number greater than 1'
    )
  })
  it('invokes proper commits with proper height and width input', () => {
    const wrapper = shallowMount(PandemicSimulator, {
      mocks: { $store: storeMockWithDispatchAndCommit },
      data: () => ({
        heightInput: 5,
        widthInput: 5
      }),
      computed: requiredComputed
    })
    wrapper.vm.createGrid()

    expect(wrapper.vm.$store.commit).toHaveBeenNthCalledWith(1, 'SET_PANDEMIC_DATE', null)
    expect(wrapper.vm.$store.commit).toHaveBeenNthCalledWith(
      2,
      'SET_MAXIMUM_INFECTION',
      false
    )
    expect(wrapper.vm.$store.commit).toHaveBeenNthCalledWith(3, 'SET_ERROR', null)

    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('createGrid', {
      height: 5,
      width: 5
    })
  })
})
