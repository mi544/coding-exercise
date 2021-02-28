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
            id="dig-radio"
            value="dig"
            v-model="actionInput"
            checked="true"
            :disabled="springsInProgress"
          />
          <label for="dig-radio" class="text-lg">Dig a hot spring</label>
        </div>
        <div class="border-4 my-1 p-1 pt-2 rounded-lg">
          <input
            type="radio"
            name="action"
            id="rocks-radio"
            value="rocks"
            v-model="actionInput"
            :disabled="springsInProgress"
          />
          <label for="rocks-radio" class="text-lg">Put rocks around</label>
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
        :disabled="springsInProgress"
      >
        Let the water run
      </button>
      <button
        class="button-md text-lg my-6"
        @click.prevent="resetGrid"
        :disabled="springsInProgress"
      >
        Reset
      </button>
      <p v-if="fullSpringsReach">Please enjoy your hot springs!</p>
      <p v-if="springsDate">{{ date }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Grid',
  data: () => ({
    actionInput: 'dig',
    springsInterval: null
  }),
  computed: {
    ...mapGetters([
      'height',
      'width',
      'grid',
      'previousGrid',
      'isGrid',
      'springsInProgress',
      'springsDate',
      'fullSpringsReach'
    ]),
    date() {
      const time = new Date(this.springsDate)
      return `${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()}`
    }
  },
  methods: {
    showLabel(value) {
      // returns proper class based on cell state
      if (value === null) return 'cell'
      if (value === 'rocks') return 'cell rocks'
      if (value === 'water') return this.springsDate ? 'cell water' : 'cell dig'
      return 'cell'
    },
    changeState(event) {
      // should not be able to adjust the dug cells once the simulation has started
      if (this.springsInProgress) return

      // no radio button selected
      if (this.actionInput !== 'dig' && this.actionInput !== 'rocks') {
        this.$store.dispatch('showError', 'No option selected (dig or rocks)')
        return
      }

      // getting cell coordinates & updating its state
      const [rowI, cellI] = event.target.dataset.index.split('.')
      // if dig selected - change the clicked cell to water, otherwise use rocks
      const action = this.actionInput === 'dig' ? 'water' : 'rocks'
      this.$store.dispatch('changeState', { rowI, cellI, action })
    },
    startSimulation() {
      this.$store.commit('SET_SPRINGS_DATE', new Date().getTime())
      // checks if there's at least one water cell on the grid
      let waterCells = false
      for (let i = 0; i < this.grid.length; i += 1) {
        for (let c = 0; c < this.grid[i].length; c += 1) {
          if (waterCells) break
          if (this.grid[i][c].value === 'water') {
            waterCells = true
            break
          }
        }
      }

      if (!waterCells) {
        this.$store.dispatch('showError', 'No cells are dug out')
        return
      }

      clearInterval(this.springsInterval)
      this.$store.commit('TOGGLE_SPRING_IN_PROGRESS', true)

      // setting an interval up to dispatch spreadNext
      this.springsInterval = setInterval(async () => {
        const result = await this.$store.dispatch('spreadNext')
        if (result) {
          this.$store.commit('TOGGLE_SPRING_IN_PROGRESS', false)
          clearInterval(this.springsInterval)
          this.$store.commit('SET_FULL_SPRINGS_REACH', true)
          return
        }
        // adding 1 day to the date
        const nextDay = new Date(this.springsDate + 24 * 60 * 60 * 1000)
        this.$store.commit('SET_SPRINGS_DATE', nextDay.getTime())
      }, 750)
    },
    resetGrid() {
      this.$store.commit('SET_SPRINGS_DATE', null)
      this.$store.commit('SET_FULL_SPRINGS_REACH', false)
      clearInterval(this.springsInterval)
      this.$store.dispatch('createGrid', { height: this.height, width: this.width })
    }
  }
}
</script>

<style lang="scss">
.row {
  .cell {
    background: url('../assets/earth.jpg');
    background-size: cover;
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
.dig {
  background: url('../assets/dig.jpg') !important;
  background-size: cover !important;
}

.rocks {
  background: url('../assets/rocks.jpg') !important;
  background-size: cover !important;
}

.water {
  background: url('../assets/water.jpg') !important;
  background-size: cover !important;
}
</style>
