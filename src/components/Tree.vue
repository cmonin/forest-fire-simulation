<script lang="ts" setup>
import { computed } from 'vue'
import {TreeState} from "@/enums/TreeState";

const props = defineProps<{
  state: TreeState
}>()

type Icon = {
  name: string
  color: string
}

const icon: Icon = computed(() => {
  switch (props.state) {
    case TreeState.ALIVE:
      return { name: 'tree', color: 'green' }
    case TreeState.BURNING:
      return { name: 'fire', color: 'darkorange' }
    case TreeState.DEAD:
      return { name: 'cross', color: 'grey' }
    default:
      throw new Error('Tree state not supported')
  }
})
</script>

<template>
  <font-awesome-icon :icon="['fas', icon.name]"  :style="{ color: icon.color }" />
</template>

<style scoped>
/* TODO eventual sizes */
</style>