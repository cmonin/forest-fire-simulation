<script setup lang="ts">
import Tree from "@/components/Tree.vue";
import {ForestState} from "@/types/ForestState";

const props = defineProps<{
  state: ForestState,
  editingEnabled?: boolean
}>()

function switchState(i: number, j: number) {
  props.state[i][j] = (props.state[i][j] + 1) % 2
}
</script>

<template>
  <div class="forest-container">
    <div v-for="(rowStates, i) in props.state">
      <Tree v-if="!editingEnabled" v-for="treeState in rowStates" :state="treeState" ></Tree>
      <Tree v-if="editingEnabled" v-for="(treeState, j) in rowStates" :state="treeState" @click="switchState(i, j)" :style="{ cursor: 'pointer' }" ></Tree>
    </div>
  </div>
</template>

<style scoped>

</style>