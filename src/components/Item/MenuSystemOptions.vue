<template>
  <q-menu>
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
    <CardAddSystem
      :card="modalCreateSystem"
      @close="modalCreateSystem = false"
      @receveid="handleReceived()"
      :label="$t('action.addSystem')"
  /></q-menu>
</template>

<script setup lang="ts">
import { options } from "./lib";
const opts = ref(options);
const { t } = useI18n();
const emits = defineEmits(["receveid", "optionDelete"]);
const modalCreateSystem = ref();
const optionDelete = 2;
function openModal(modal: string) {
  if (modal === "addSystem") {
    return (modalCreateSystem.value = true);
  }
  opts.value[optionDelete] = "desactiveOptionDelete";
  return emits("optionDelete");
}

function handleReceived() {
  emits("receveid");
  modalCreateSystem.value = false;
}
</script>
