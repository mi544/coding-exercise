// 🕵️🕵️🕵️ sleuth spic [py] 🕵️🕵️🕵️

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
