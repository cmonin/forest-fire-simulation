<script setup lang="ts">
const props = defineProps<{
  icon: string
}>()
</script>

<template>
  <button><font-awesome-icon :icon="['fas', props.icon]" /></button>
</template>

<style scoped>
  button {
    font-size: 1.2em;
    width: 48px;
    height:32px ;
    text-align: center;
    margin-right:2px;
    background-color: dodgerblue;
    border: none;
    color: white;
    border-radius: 2px;
  }
  button:not(:disabled) {
    cursor: pointer;
  }
  button:disabled {
    opacity: 0.5;
  }
</style>