import { shallowMount } from '@vue/test-utils'
import HotSprings from '../../HotSprings.vue'

// defining required properties to mock them later
const requiredComputed = {
  springsInProgress() {
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

describe('HotSprings', () => {
  it('mounts successfully', () => {
    const wrapper = shallowMount(HotSprings, {
      mocks: { $store: storeMock },
      computed: requiredComputed
    })
    expect(wrapper.exists()).toBeTruthy()
  })
  it('matches snapshot', () => {
    const wrapper = shallowMount(HotSprings, {
      mocks: { $store: storeMock },
      computed: requiredComputed
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('HotSprings error handler', () => {
  // displays error if height and width are not integers
  it('displays error if height and width are floats', () => {
    const wrapper = shallowMount(HotSprings, {
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
  it('displays error if height and width are > 20', () => {
    const wrapper = shallowMount(HotSprings, {
      mocks: { $store: storeMockWithDispatch },
      data: () => ({
        heightInput: 25,
        widthInput: 25
      }),
      computed: requiredComputed
    })
    wrapper.vm.createGrid()
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith(
      'showError',
      'Number provided is too big, please provide a number less than 20'
    )
  })
  it('displays error if height and width are < 0', () => {
    const wrapper = shallowMount(HotSprings, {
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
  it('displays error if height and width are 0', () => {
    const wrapper = shallowMount(HotSprings, {
      mocks: { $store: storeMockWithDispatch },
      data: () => ({
        heightInput: 0,
        widthInput: 0
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
    const wrapper = shallowMount(HotSprings, {
      mocks: { $store: storeMockWithDispatchAndCommit },
      data: () => ({
        heightInput: 5,
        widthInput: 5
      }),
      computed: requiredComputed
    })
    wrapper.vm.createGrid()

    expect(wrapper.vm.$store.commit).toHaveBeenNthCalledWith(1, 'SET_SPRINGS_DATE', null)
    expect(wrapper.vm.$store.commit).toHaveBeenNthCalledWith(
      2,
      'SET_FULL_SPRINGS_REACH',
      false
    )
    expect(wrapper.vm.$store.commit).toHaveBeenNthCalledWith(3, 'SET_ERROR', null)

    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('createGrid', {
      height: 5,
      width: 5
    })
  })
})
