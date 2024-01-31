<script setup lang="ts">
import {defineModel, computed } from "vue";

const flammabilityModel: number = defineModel('burnProbability')
const props = defineProps<{
  label: string,
  width: string,
  backgroundColor: string,
  thumbWidth: string,
  thumbHeight: string,
  thumbImage: string,
  disabled?: boolean
}>()

const background: string = computed(() => {
  const percent = (flammabilityModel.value * 100) + '%'
  return 'linear-gradient(to right, ' + props.backgroundColor + ' ' + percent + ', #ccc ' + percent + ')'
})
const opacity: string = computed(() => {
  return props.disabled ? 0.5 : 1;
})
</script>

<template>
  <label>{{ props.label }}</label>
  <input
      type="range"
      v-model="flammabilityModel"
      min="0"
      max="1"
      step="0.01"
      :disabled="props.disabled"
      :style="{ background: background, opacity: opacity}"
  />
  {{ Math.round(flammabilityModel * 100) }}%
</template>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: v-bind('props.width');
  outline: none;
  border-radius: 15px;
  height: 6px;
}

input[type="range"]:not(:disabled) {
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: v-bind('props.thumbHeight');
  width: v-bind('props.thumbWidth');
  background-image: v-bind('props.thumbImage');
  background-size: cover;
  border: none;
}
input[type="range"]::-moz-range-thumb {
  height: v-bind('props.thumbHeight');
  width: v-bind('props.thumbWidth');
  background-image: v-bind('props.thumbImage');
  background-size: cover;
  border: none;
}

</style>