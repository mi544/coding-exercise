<template>
  <section>
    <h2 class="text-2xl m-auto mb-8 max-w-5/6">
      Please enter your desired 2-D grid size:
    </h2>
    <form @submit.prevent="createGrid">
      <label for="height" class="text-lg block">Height:</label>
      <input
        v-model.number="heightInput"
        id="height"
        type="number"
        class="text-lg border-2 rounded my-2 p-1"
        :disabled="pandemicInProgress"
      />
      <label for="width" class="text-lg block">Width:</label>
      <input
        v-model.number="widthInput"
        id="width"
        type="number"
        class="text-lg border-2 rounded my-2 p-1"
        :disabled="pandemicInProgress"
      />
      <button class="button-lg mt-4" :disabled="pandemicInProgress">Create Grid</button>
      <p
        :class="[
          error ? 'opacity-1' : 'opacity-0 hidden',
          'transition-all',
          'duration-1000',
          'ease-in-out',
          'bg-red-200',
          'mx-auto',
          'my-6',
          'max-w-3/4',
          'md:max-w-1/2',
          'md:h-20',
          'h-16',
          'flex',
          'justify-center',
          'items-center',
          'rounded-lg'
        ]"
      >
        {{ error }}
      </p>
      <Grid v-if="isGrid" />
    </form>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Grid from '@C/Grid.vue'

export default {
  name: 'PandemicSimulator',
  components: { Grid },
  data: () => ({
    heightInput: null,
    widthInput: null
  }),
  computed: { ...mapGetters(['pandemicInProgress', 'isGrid', 'error']) },
  methods: {
    createGrid() {
      if (!Number.isInteger(this.heightInput) || !Number.isInteger(this.widthInput)) {
        this.$store.dispatch('showError', 'No height or width provided')
        return
      }

      if (this.heightInput > 128 || this.widthInput > 128) {
        this.$store.dispatch('showError', 'Number provided is too big')
        this.heightInput = null
        this.widthInput = null
        return
      }

      if (this.heightInput < 0 || this.widthInput < 0) {
        this.$store.dispatch('showError', 'Number provided is too small')
        this.heightInput = null
        this.widthInput = null
        return
      }

      this.$store.commit('SET_ERROR', null)
      this.$store.dispatch('createGrid', {
        height: this.heightInput,
        width: this.widthInput
      })

      this.$store.commit('SET_PANDEMIC_DATE', new Date().getTime())

      this.heightInput = null
      this.widthInput = null
    }
  }
}
</script>
