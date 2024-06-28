<template>
  <q-btn-toggle
    v-model="model"
    toggle-color="indigo"
    class="bg-white text-green"
    @update:model-value="changeModel"
    :options="translatedButtonsRepeat"
  />
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";
import { buttonsRepeat } from "./lib"; // Suponha que buttonsRepeat contém seus dados de botões
const emits = defineEmits(["optionRepeat"]);

const model = ref();
const { t } = useI18n();

const translatedButtonsRepeat = computed(() =>
  buttonsRepeat.map((button) => ({
    label: t(`userScheduleRoom.${button.label}`),
    value: button.value,
  })),
);

const changeModel = (option: string) => {
  model.value = option;
  emits("optionRepeat", model.value);
};
</script>
