<template>
  <section>
    <h2 class="text-2xl m-auto mb-8 max-w-3/4">
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
      <Grid />
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
  computed: { ...mapGetters(['pandemicInProgress']) },
  methods: {
    createGrid() {
      if (!Number.isInteger(this.heightInput) || !Number.isInteger(this.widthInput)) {
        console.log('no height/width')
        //! Add height error message
        return
      }

      if (this.heightInput > 128 || this.widthInput > 128) {
        console.log('number too big')
        //! Add number too big error message
        this.heightInput = null
        this.widthInput = null
        return
      }

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
