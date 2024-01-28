<script lang="ts" setup>
import { ref, computed } from 'vue'
import type {ForestState} from "@/types/ForestState";
import FileReader from "@/components/FileReader.vue";
import type {TreeState} from "@/types/TreeState";
import Forest from "@/components/Forest.vue";
import {computeBurningTreesCount, computeDeadTreesCount, nextForestState} from "@/behaviour/ForestFire";
import Dashboard from "@/components/Dashboard.vue";
import RangePicker from "@/components/RangePicker.vue";

const flammability: number = ref(0)
const forestState: ForestState = ref([])
const isInitiatingConfiguration: boolean = ref(true)
const stepsCount: number = ref(0)
const deadTreesCount: number = ref(0)
const fireKeepsSpreading: boolean = ref(true)


const isAnimating: boolean = ref(false)
const animationTimeInSeconds: number = ref(0.1)

const startOrStopButtonLabel: string = computed(() => {
  return isAnimating.value ? 'Stop' : 'Start'
});


let last; // timestamp of the last render() call
let handle;

function startOrStopAnimation() {
  if (isAnimating.value && handle) {
    cancelAnimationFrame(handle)
  } else {
    animateNext()
  }
  isAnimating.value = !isAnimating.value;
}

function animateNext() {
  if (!last) {
    last = performance.now() - animationTimeInSeconds.value * 500
  }
  if(performance.now() - last >= animationTimeInSeconds.value * 1000) {
    last = performance.now();
    if (fireKeepsSpreading.value) {
      spreadFire();
    }
  }
  if (fireKeepsSpreading.value) {
    handle = requestAnimationFrame(animateNext);
  } else {
    cancelAnimationFrame(handle)
  }
}


function readTextFile(text: string) {
  const textRows: string[] = text.split('\n')
  flammability.value = textRows.shift();
  forestState.value = parseTextToForestState(textRows)
}

function handleClickLaunchButton() {
  isInitiatingConfiguration.value = false
}

function spreadFire() {
  const newForestState = nextForestState(forestState.value, flammability.value)
  forestState.value = newForestState
  stepsCount.value++
  deadTreesCount.value = computeDeadTreesCount(newForestState)
  fireKeepsSpreading.value = (computeBurningTreesCount(newForestState) > 0)
}

function parseTextToForestState(textRows: string[]): ForestState {
  const res: ForestState = [];
  textRows.forEach((textRow: string) => {
    const states: TreeState[] = textRow
        .replace(' ', '')
        .split('')
        .map((char: string) => parseInt(char))
    res.push(states);
  })
  return res
}

</script>

<template>
  <FileReader v-if="isInitiatingConfiguration" @load="readTextFile"></FileReader>
  <div>
    <label>Flammability</label>
    <RangePicker v-model:flammability="flammability"
                 :disabled="!isInitiatingConfiguration"
                 min="0"
                 max="1"
                 step="0.01"
                 width="220px"
                 background-color="#f50"
                 thumb-height="30px"
                 thumb-width="20px"
                 thumb-image="url('./src/assets/flame.png')"
    />
    {{ Math.round(flammability * 100) }}%
  </div>
  <div>
    <Forest :state="forestState" :editingEnabled="isInitiatingConfiguration" />
  </div>
  <div class="init-commands" v-if="isInitiatingConfiguration" >
    <button @click="handleClickLaunchButton">Launch a simulation</button>
  </div>
  <div class="simulation-commands" v-if="!isInitiatingConfiguration">
    <button v-if="fireKeepsSpreading" @click="startOrStopAnimation">{{ startOrStopButtonLabel }}</button>
    <button v-if="fireKeepsSpreading" @click="spreadFire" :disabled="isAnimating">Next step</button>
    <div v-if="!fireKeepsSpreading">
      End
    </div>

  </div>
  <Dashboard :dead-trees-count="deadTreesCount" :steps-count="stepsCount" />
</template>

<style scoped>

</style>