<template>
  <q-icon
    name="more_vert"
    color="white"
    class="position-icon cursor-pointer"
    clickable
    @click="modalCreateSystem"
  >
    <MenuOptsCert />
  </q-icon>
</template>
<script setup lang="ts">
const modalCreateSystem = ref();
</script>
