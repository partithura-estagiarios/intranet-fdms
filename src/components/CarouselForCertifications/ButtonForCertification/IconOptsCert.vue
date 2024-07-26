<template>
  <q-icon
    name="more_vert"
    color="white"
    class="position-icon cursor-pointer"
    clickable
    @click="modalCreateSystem"
  >
    <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
      {{ $t("action.systemModuleCertifications") }}
    </q-tooltip>
    <MenuOptsCert />
  </q-icon>
</template>
<script setup lang="ts">
const modalCreateSystem = ref();
</script>
