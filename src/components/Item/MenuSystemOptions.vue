<template>
  <q-menu touch-position>
    <q-list>
      <q-item
        clickable
        v-close-popup
        @click="openModal(option)"
        v-for="option in options"
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
const emits = defineEmits(["receveid", "optionDelete"]);
const modalCreateSystem = ref();
function openModal(modal: string) {
  if (modal === "addSystem") {
    return (modalCreateSystem.value = true);
  }
  return emits("optionDelete");
}
function handleReceived() {
  emits("receveid");
  modalCreateSystem.value = false;
}
</script>
