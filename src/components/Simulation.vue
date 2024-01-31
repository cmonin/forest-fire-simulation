<script lang="ts" setup>
import { ref, computed } from 'vue'
import type {ForestState} from "@/types/ForestState";
import FileReader from "@/components/fields/FileReader.vue";
import type {TreeState} from "@/types/TreeState";
import Forest from "@/components/map/Forest.vue";
import {nextForestState} from "@/engine/SpreadFire";
import {countStates} from "@/engine/CountStates";
import ProbabilityPicker from "@/components/fields/ProbabilityPicker.vue";
import TextField from "@/components/fields/TextField.vue";
import type {StatesCount} from "@/types/StatesCount";
import IconButton from "@/components/fields/IconButton.vue";

const fileUploaded: boolean = ref(false)
const flammability: number = ref(0)
const forestState: ForestState = ref([])
const isInitiatingConfiguration: boolean = ref(true)
const stepsCount: number = ref(0)
const isAnimating: boolean = ref(false)

const animationTimeInSeconds: number = ref(2)


const statesCount: StatesCount = computed(() => {
  return countStates(forestState.value)
});

const playOrPauseButtonIcon: string = computed(() => {
  return isAnimating.value ? 'pause' : 'play'
});



let lastAnimationMoment; // timestamp of the last render() call
let handle;


function startOrStopAnimation() {
  isInitiatingConfiguration.value = false
  if (isAnimating.value && handle) {
    cancelAnimationFrame(handle)
  } else {
    doAnimate()
  }
  isAnimating.value = !isAnimating.value;
}

function doAnimate() {
  function animationTimePassedSinceLast(): boolean {
    return performance.now() - lastAnimationMoment >= animationTimeInSeconds.value * 1000;
  }
  if (!lastAnimationMoment) {
    lastAnimationMoment = performance.now() - animationTimeInSeconds.value * 500
  }
  const fireSpreads = statesCount.value.burning > 0
  if (animationTimePassedSinceLast()) {
    lastAnimationMoment = performance.now();
    if (fireSpreads) {
      spreadFire();
    }
  }
  if (fireSpreads) {
    handle = requestAnimationFrame(doAnimate);
  } else {
    cancelAnimationFrame(handle)
  }
}


function readTextFile(text: string) {
  const textRows: string[] = text.split('\n')
  flammability.value = textRows.shift();
  forestState.value = parseTextToForestState(textRows)
  fileUploaded.value = true
}

function handleClickLaunchButton() {
  isInitiatingConfiguration.value = false
}

function spreadFire() {
  isInitiatingConfiguration.value = false
  stepsCount.value++
  forestState.value = nextForestState(forestState.value, flammability.value)
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

function retry() {
  fileUploaded.value = false
  flammability.value = 0
  forestState.value = []
  isInitiatingConfiguration.value = true
  stepsCount.value = 0
  isAnimating.value = false
}

</script>

<template>
  <FileReader v-if="!fileUploaded" @load="readTextFile" label="Upload a configuration file"></FileReader>
  <div v-if="fileUploaded" class="simulation-container">

    <div class="simulation-control">
      <div class="simulation-control-map">
        <ProbabilityPicker v-model:flammability="flammability"
                           :disabled="!isInitiatingConfiguration"
                           label="Burn probability"
                           width="200px"
                           background-color="#f50"
                           thumb-height="30px"
                           thumb-width="20px"
                           thumb-image="url('./src/assets/flame.png')"
        />
        <Forest class="simulation-forest" v-model:state="forestState" :editingEnabled="isInitiatingConfiguration" />
      </div>
      <div class="simulation-control-time">

        <IconButton v-if="statesCount.burning > 0" @click="startOrStopAnimation" :icon="playOrPauseButtonIcon" />
        <IconButton v-if="statesCount.burning > 0" @click="spreadFire" icon="forward-step" :disabled="isAnimating" />

        <IconButton v-if="statesCount.burning === 0" @click="retry" icon="rotate-right" />

      </div>
    </div>

    <div class="simulation-dashboard">
      <section class="caption">
        <TextField label="Living trees" :value="statesCount.alive" icon="tree" icon-color="green" />
        <TextField label="Burning trees" :value="statesCount.burning" icon="fire" icon-color="darkorange" />
        <TextField label="Dead trees" :value="statesCount.dead" icon="cross" icon-color="grey" />
      </section>
      <section style="text-align: center">
        t = {{ stepsCount }}
      </section>
    </div>

  </div>


</template>

<style scoped>
.simulation-container {
  display: flex;
  justify-content: space-between;
}

.simulation-control,
.simulation-dashboard {
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}

.simulation-control {
  max-width: calc(100% - 180px);
}

.caption,
.simulation-forest {
  white-space: nowrap;
  overflow-y: auto;
  margin-bottom: 24px;
}

.simulation-forest {
  margin-top: 32px;
  max-height: calc(100vh - 250px);
}
.simulation-control-time {
  text-align: center;
}

.simulation-dashboard {
  width: 180px;
  padding: 0 0 0 16px;
}

</style>