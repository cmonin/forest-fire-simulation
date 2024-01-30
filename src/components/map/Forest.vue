<script setup lang="ts">
import Tree from "@/components/map/Tree.vue";
import {ForestState} from "@/types/ForestState";
import {defineModel} from "vue";

const stateModel: ForestState = defineModel('state')
const props = defineProps<{
  editingEnabled?: boolean
}>()

function switchState(i: number, j: number) {
  stateModel.value[i][j] = (stateModel.value[i][j] + 1) % 2
}
</script>

<template>
  <div class="forest-container">
    <div v-for="(rowStates, i) in stateModel">
      <Tree v-if="!props.editingEnabled" v-for="treeState in rowStates" :state="treeState" ></Tree>
      <Tree v-if="props.editingEnabled" v-for="(treeState, j) in rowStates" :state="treeState" @click="switchState(i, j)" :style="{ cursor: 'pointer' }" ></Tree>
    </div>
  </div>
</template>
