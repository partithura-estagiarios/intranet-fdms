<template>
  <q-btn-toggle
    v-model="model"
    toggle-color="indigo"
    class="bg-white text-green"
    :options="translatedButtonsRepeat"
  />
</template>

<script setup lang="ts">
import { buttonsRepeat } from "./lib";
const { t } = useI18n();
const model = ref("none");
const translatedButtonsRepeat = computed(() =>
  buttonsRepeat.map((button) => ({
    label: t(`userScheduleRoom.${button.label}`),
    value: button.value,
  })),
);
</script>

<style scoped></style>
