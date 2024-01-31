<script lang="ts" setup>
import { computed } from 'vue'
import {TreeState} from "@/types/tree-state";

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
      throw new Error('Tree state not supported: ' + props.state)
  }
})
</script>

<template>
  <div>
    <font-awesome-icon :icon="['fas', icon.name]"  :style="{ color: icon.color }" />
  </div>
</template>

<style scoped>
  div {
    display: inline-block;
    width:18px;
    text-align: center;
  }
</style>