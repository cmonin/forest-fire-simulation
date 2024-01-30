<script setup lang="ts">
const props = defineProps<{
  label: string,
  value: string
}>()
</script>

<template>
  <label>{{ props.label }}</label>
  <div>{{ props.value }}</div>
</template>

<style scoped>
  div {
    margin-bottom: 8px;
  }
</style>