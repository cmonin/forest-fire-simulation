<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  label: string,
  value: string | number,
  icon?: string,
  iconColor?: string
}>()

const valueMargin: string = computed(() => {
  return props.icon ? '24px' : '0'
})
</script>

<template>
  <font-awesome-icon v-if="props.icon" :icon="['fas', props.icon]"  :style="{ color: props.iconColor }" /><label>{{ props.label }}</label>
  <div :style="{ marginLeft: valueMargin }">{{ props.value }}</div>
</template>

<style scoped>
  label {
    font-weight: bold;
  }
  div {
    margin-bottom: 16px;
  }
  svg {
    width: 16px;
  }
  svg + label {
    margin-left: 8px;
    display: inline-block;
    width: calc(100% - 24px);
  }
</style>