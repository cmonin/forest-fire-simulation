<script setup lang="ts">
import {TreeState} from "@/enums/TreeState";
import Tree from "@/components/Tree.vue";

const props = defineProps<{
  states: TreeState[]
}>()
</script>

<template>
  <div>
    <div v-for="rowStates in props.states">
      <Tree v-for="treeState in rowStates" :state="treeState"></Tree>
    </div>
  </div>
</template>

<style scoped>

</style>