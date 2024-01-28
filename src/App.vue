<script setup lang="ts">
import Simulation from "@/components/Simulation.vue";

</script>

<template>
  <header>
    <img src="./assets/logo.jpg" />
    Forest Fire Simulation
  </header>

  <main>
    <Simulation />
  </main>
</template>

<style scoped>
header, main {
  padding: 8px 16px;
  background: var(--forestfire-light-background);
  position: absolute;
  left: 0;
  right: 0;
}
header {
  top: 8px;
  font-size: 1.3em;
  display: flex;
  height:72px;
  align-items: center;
}
img {
  width: 56px;
  margin-right: 24px;
}
main {
  margin-top: 2px;
  top: 80px;
  bottom: 8px;
}
</style>
