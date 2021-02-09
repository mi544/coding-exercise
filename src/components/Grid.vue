<template>
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
            :disabled="pandemicInProgress"
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
            :disabled="pandemicInProgress"
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
          v-on:click="changeState"
        ></div>
      </div>
    </div>
    <div>
      <button
        class="button-md text-lg"
        @click.prevent="startSimulation"
        :disabled="pandemicInProgress"
      >
        Simulate Pandemic
      </button>
      <button
        class="button-md text-lg my-6"
        @click.prevent="resetGrid"
        :disabled="pandemicInProgress"
      >
        Reset
      </button>
      <p>{{ date }}</p>
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
    ...mapGetters([
      'height',
      'width',
      'grid',
      'previousGrid',
      'isGrid',
      'pandemicInProgress',
      'pandemicDate'
    ]),
    date() {
      const time = new Date(this.pandemicDate)
      return `${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()}`
    }
  },
  methods: {
    showLabel(value) {
      // returns proper class based on cell state
      if (value === null) return 'cell'
      if (value === 'immune') return 'cell immune'
      if (value === 'infection') return 'cell infection'
      return 'cell'
    },
    changeState(event) {
      // should not be able to adjust the infection once the pandemic has started
      if (this.pandemicInProgress) return

      // no radio button selected
      if (this.actionInput !== 'infection' && this.actionInput !== 'immune') {
        this.$store.dispatch('showError', 'No option selected (infect or immune)')
        return
      }

      // getting cell coordinates & updating its state
      const [rowI, cellI] = event.target.dataset.index.split('.')
      this.$store.dispatch('changeState', { rowI, cellI, action: this.actionInput })
    },
    startSimulation() {
      this.$store.commit('SET_PANDEMIC_DATE', new Date().getTime())
      // checks if there's at least one infection on the grid
      let infectedCells = false
      for (let i = 0; i < this.grid.length; i += 1) {
        for (let c = 0; c < this.grid[i].length; c += 1) {
          if (infectedCells) break
          if (this.grid[i][c].value === 'infection') {
            infectedCells = true
            break
          }
        }
      }

      if (!infectedCells) {
        this.$store.dispatch('showError', 'No cells are infected')
        return
      }

      clearInterval(this.pandemicInterval)
      this.$store.commit('TOGGLE_PANDEMIC_IN_PROGRESS', true)

      // setting an interval up to dispatch infections
      this.pandemicInterval = setInterval(async () => {
        const result = await this.$store.dispatch('infectNext')
        if (result) {
          this.$store.commit('TOGGLE_PANDEMIC_IN_PROGRESS', false)
          clearInterval(this.pandemicInterval)
          return
        }
        // adding 1 day to the date
        const nextDay = new Date(this.pandemicDate + 24 * 60 * 60 * 1000)
        this.$store.commit('SET_PANDEMIC_DATE', nextDay.getTime())
      }, 1 * 1000)
    },
    resetGrid() {
      clearInterval(this.pandemicInterval)
      this.$store.dispatch('createGrid', { height: this.height, width: this.width })
      this.$store.commit('SET_PANDEMIC_DATE', new Date().getTime())
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
