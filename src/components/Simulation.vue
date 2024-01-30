<script lang="ts" setup>
import { ref, computed } from 'vue'
import type {ForestState} from "@/types/ForestState";
import FileReader from "@/components/fields/FileReader.vue";
import type {TreeState} from "@/types/TreeState";
import Forest from "@/components/Forest.vue";
import {
  computeStatesCount,
  nextForestState
} from "@/behaviour/ForestFire";
import ProbabilityPicker from "@/components/ProbabilityPicker.vue";
import TextField from "@/components/fields/TextField.vue";
import type {StatesCount} from "@/types/StatesCount";

const flammability: number = ref(0)
const forestState: ForestState = ref([])
const isInitiatingConfiguration: boolean = ref(true)
const stepsCount: number = ref(0)
const statesCount: StatesCount = ref({alive: 0, burning: 0, dead: 0});
const fireKeepsSpreading: boolean = ref(true)


const isAnimating: boolean = ref(false)
const animationTimeInSeconds: number = ref(0.1)

const startOrStopButtonLabel: string = computed(() => {
  return isAnimating.value ? 'Stop' : 'Start'
});


let lastAnimationMoment; // timestamp of the last render() call
let handle;

function startOrStopAnimation() {
  if (isAnimating.value && handle) {
    cancelAnimationFrame(handle)
  } else {
    doAnimate()
  }
  isAnimating.
  isAnimating.value = !isAnimating.value;
}

function doAnimate() {
  function animationTimePassedSinceLast(): boolean {
    return performance.now() - lastAnimationMoment >= animationTimeInSeconds.value * 1000;
  }
  if (!lastAnimationMoment) {
    lastAnimationMoment = performance.now() - animationTimeInSeconds.value * 500
  }
  if (animationTimePassedSinceLast()) {
    lastAnimationMoment = performance.now();
    if (fireKeepsSpreading.value) {
      spreadFire();
    }
  }
  if (fireKeepsSpreading.value) {
    handle = requestAnimationFrame(doAnimate);
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
  stepsCount.value++
  const newForestState = nextForestState(forestState.value, flammability.value)
  const newStatesCount = computeStatesCount(newForestState)
  forestState.value = newForestState
  statesCount.value = newStatesCount
  fireKeepsSpreading.value = (newStatesCount.burning > 0)
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
  <div class="simulation-container">

    <div class="simulation-map">
      <FileReader v-if="isInitiatingConfiguration" @load="readTextFile" label="Upload a configuration file"></FileReader>
      <ProbabilityPicker v-model:flammability="flammability"
                         :disabled="!isInitiatingConfiguration"
                         label="Flammability"
                         width="160px"
                         background-color="#f50"
                         thumb-height="30px"
                         thumb-width="20px"
                         thumb-image="url('./src/assets/flame.png')"
      />
      <Forest :state="forestState" :editingEnabled="isInitiatingConfiguration" />
    </div>

    <div class="simulation-dashboard">
      <TextField label="Step" :value="stepsCount" />
      <TextField label="Living trees" :value="statesCount.alive" />
      <TextField label="Burning trees" :value="statesCount.burning" />
      <TextField label="Dead trees" :value="statesCount.dead" />
    </div>

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

</template>

<style scoped>
.simulation-container {
  display: flex;
  justify-content: space-between;
}
.simulation-map {
  white-space: nowrap;
  overflow-y: auto;
  height: calc(100vh - 200px);
}

.simulation-dashboard {
  width: 210px;
  height: calc(100vh - 200px);
  background: lightblue;
}
</style>