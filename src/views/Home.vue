<template>
  <div class="home">
    <h4>This is home!</h4>
    <PandemicSimulator />
  </div>
</template>

<script>
import PandemicSimulator from '@C/PandemicSimulator.vue'

export default {
  name: 'Home',
  components: { PandemicSimulator }
}
</script>
