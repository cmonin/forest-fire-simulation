<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  label: string
}>()
const emit = defineEmits<{
  load: [text: string]
}>()

const isLoading = ref(false);
const errorDuringLoading = ref(false);

function loadConfigFile(e, files = e.target.files) {
  if (files.length) {
    const file = files[0];
    const reader = new FileReader()
    reader.onload = (e) => {
      isLoading.value = true
      errorDuringLoading.value = false
    }
    reader.onloadend = (e) => {
      isLoading.value = false
      emit('load', e.target.result)
    }
    reader.onerror = (e) => {
      errorDuringLoading.value = true
    }
    reader.readAsText(file)
  }
}

</script>

<template>
  <label class="text-reader">
    {{ props.label }}
  </label>
  <input type="file" @change="loadConfigFile" />
  <div v-if="isLoading">Loading...</div>
  <div v-if="errorDuringLoading">Error during loading</div>
</template>

<style scoped>

</style>