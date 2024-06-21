<template>
  <q-menu touch-position>
    <q-list>
      <q-item
        clickable
        v-close-popup
        v-for="option in options"
        @click="openModal(option)"
      >
        <q-item-label class="text-black">{{
          $t(`action.${option}`)
        }}</q-item-label>
      </q-item>
    </q-list>
  </q-menu>
  <CardAddSystem
    :card="modalCreateSystem"
    @close="modalCreateSystem = false"
    @receveid="handleReceived()"
    :label="$t('action.addSystem')"
  />
</template>

<script setup lang="ts">
import { options } from "./lib";
const emits = defineEmits(["receveid"]);
const modalCreateSystem = ref();
const modalEditSystem = ref();
const modalDeleteSystem = ref();
function openModal(modal: string) {
  if (modal === "addSystem") {
    return (modalCreateSystem.value = true);
  }
  if (modal === "editSystem") {
    return (modalEditSystem.value = true);
  }
  return (modalDeleteSystem.value = true);
}
function handleReceived() {
  emits("receveid");
  modalCreateSystem.value = false;
}
</script>
