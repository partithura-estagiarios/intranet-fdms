<template>
  <q-menu fit>
    <q-list>
      <q-space class="q-py-sm" />
      <q-item
        v-if="!optionDisable.disable"
        clickable
        v-for="option in options"
        :key="option"
        @click="openModal(option)"
        v-close-popup
      >
        <q-item-label class="text-black">
          {{ $t(`action.${option}`) }}
        </q-item-label>
      </q-item>
      <q-item
        v-if="optionDisable.disable"
        clickable
        v-close-popup
        @click="openModal('deleteSystem')"
      >
        <q-item-label class="text-black">
          {{ $t(`action.${optionDisable.label}`) }}
        </q-item-label>
      </q-item>
    </q-list>
  </q-menu>
  <CardAddSystem
    v-if="modalCreateSystem"
    :card="modalCreateSystem"
    @close="modalCreateSystem = false"
    :label="$t('action.addSystem')"
  />
</template>

<script setup lang="ts">
import { options } from "./lib";

const emits = defineEmits(["activeDeleteSystem"]);

const optionDisable = reactive({
  disable: false,
  label: "disableDeleteSystems",
});

const modalCreateSystem = ref(false);

function openModal(modal: string) {
  if (modal === "addSystem") {
    return (modalCreateSystem.value = true);
  }
  if (modal === "deleteSystem") {
    optionDisable.disable = !optionDisable.disable;
    return emits("activeDeleteSystem");
  }
}
</script>
