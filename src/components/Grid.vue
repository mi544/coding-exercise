<template v-if="isGrid">
  <div
    class="flex flex-col md:flex-row justify-around md:justify-evenly items-center md:items-start mt-4 md:my-24"
  >
    <div>
      <form>
        <div class="border-4 my-1 p-1 pt-2 rounded-lg">
          <input
            type="radio"
            name="action"
            id="infection-radio"
            value="infection"
            v-model="actionInput"
            checked="true"
          />
          <label for="infection-radio" class="text-lg">Infection</label>
        </div>
        <div class="border-4 my-1 p-1 pt-2 rounded-lg">
          <input
            type="radio"
            name="action"
            id="immune-radio"
            value="immune"
            v-model="actionInput"
          />
          <label for="immune-radio" class="text-lg">Immune</label>
        </div>
      </form>
    </div>
    <div class="max-w-3/4">
      <div v-for="(row, index) in grid" :key="index" class="row flex">
        <div
          v-for="cell in row"
          :key="cell.id"
          :class="[showLabel(cell.value)]"
          :data-index="cell.id"
          @click="changeState"
        ></div>
      </div>
    </div>
    <div>
      <button class="button-md text-lg" @click.prevent="startSimulation">
        Simulate Pandemic
      </button>
      <button v-if="isGrid" class="button-md text-lg my-6" @click.prevent="resetGrid">
        Reset
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Grid',
  data: () => ({
    actionInput: 'infection',
    pandemicInterval: null
  }),
  computed: {
    ...mapGetters(['height', 'width', 'grid', 'isGrid'])
  },
  methods: {
    showLabel(value) {
      if (value === null) return 'cell'
      if (value === 'immune') return 'cell immune'
      if (value === 'infection') return 'cell infection'
      return 'cell'
    },
    changeState(event) {
      const [rowI, cellI] = event.target.dataset.index.split('.')
      if (this.actionInput !== 'infection' && this.actionInput !== 'immune') {
        // ! SHOW ERROR
        // ! NO RADIO BTN SELECTED
        return
      }
      this.$store.dispatch('changeState', { rowI, cellI, action: this.actionInput })
    },
    startSimulation() {
      clearInterval(this.pandemicInterval)
      this.$store.dispatch('infectNext')
      this.pandemicInterval = setInterval(
        () => this.$store.dispatch('infectNext'),
        2 * 250
      )
      // ! REDO!
      setTimeout(() => clearInterval(this.pandemicInterval), 10 * 1000)
    },
    resetGrid() {
      clearInterval(this.pandemicInterval)
      this.$store.dispatch('createGrid', { height: this.height, width: this.width })
    }
  }
}
</script>

<style lang="scss">
.row {
  .cell {
    border-width: 2px 2px 0 0;
    width: 50px;
    height: 50px;

    &:first-child {
      border-left-width: 2px;
    }
  }

  &:last-child {
    .cell {
      border-bottom-width: 2px;
    }
  }
}
.infection {
  @apply bg-red-300;
}

.immune {
  @apply bg-green-300;
}
</style>
