<template>
  <section>
    <h2 class="text-2xl mb-8">Please enter your desired 2-D grid size:</h2>
    <form @submit.prevent="createGrid">
      <label for="height" class="text-lg block">Height:</label>
      <input
        v-model.number="height"
        id="height"
        type="number"
        class="text-lg border-2 rounded my-2 p-1"
      />
      <label for="width" class="text-lg block">Width:</label>
      <input
        v-model.number="width"
        id="width"
        type="number"
        class="text-lg border-2 rounded my-2 p-1"
      />
      <button class="text-xl border-8 rounded block m-auto mt-4 p-2">Create Grid</button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'PandemicSimulator',
  data: () => ({
    height: null,
    width: null
  }),
  methods: {
    createGrid() {
      console.log('ok grid is here')
    }
  }
}
</script>
