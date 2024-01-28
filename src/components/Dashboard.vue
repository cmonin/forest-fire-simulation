<script setup lang="ts">
const props = defineProps<{
  stepsCount: number,
  deadTreesCount: number
}>()
</script>

<template>
  <div>
    Steps: {{ props.stepsCount }}
  </div>
  <div>
    Dead trees: {{ props.deadTreesCount }}
  </div>
</template>

<style scoped>

</style>