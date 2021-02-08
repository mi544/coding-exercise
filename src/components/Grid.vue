<template v-if="isGrid">
  <div class="flex justify-around my-24">
    <div>
      <p>pick what to do:</p>
      <form>
        <div>
          <input
            type="radio"
            name="action"
            id="infection-radio"
            value="infection"
            v-model="actionInput"
            checked="true"
          />
          <label for="infection-radio">Infection</label>
        </div>
        <div>
          <input
            type="radio"
            name="action"
            id="immune-radio"
            value="immune"
            v-model="actionInput"
          />
          <label for="immune-radio">Immune</label>
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
        >
          .
        </div>
      </div>
    </div>
    <div><button class="button-md text-lg">Simulate Pandemic</button></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Grid',
  data: () => ({
    actionInput: 'infection'
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
        return
      }
      this.$store.dispatch('changeState', { rowI, cellI, action: this.actionInput })
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
  @apply bg-red-200;
}

.immune {
  @apply bg-blue-200;
}
</style>
