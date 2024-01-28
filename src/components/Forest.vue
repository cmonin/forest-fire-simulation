<script setup lang="ts">
import Tree from "@/components/Tree.vue";
import {ForestState} from "@/types/ForestState";

const props = defineProps<{
  state: ForestState
}>()
</script>

<template>
  <div>
    <div v-for="rowStates in props.state">
      <Tree v-for="treeState in rowStates" :state="treeState"></Tree>
    </div>
  </div>
</template>

<style scoped>

</style>