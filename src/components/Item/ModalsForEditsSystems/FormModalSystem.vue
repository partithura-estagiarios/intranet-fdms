<template>
  <q-card-section class="row">
    <q-input
      v-model="formSystem.label"
      stack-label
      :label="$t('text.label')"
      class="q-px-md"
    />
    <InputsIcons @receveid="(val) => (formSystem.icon = val)" />
  </q-card-section>
  <q-card-section class="row">
    <q-input
      v-model="formSystem.sublabel"
      stack-label
      :label="$t('text.subLabel')"
      class="q-px-md"
    />
    <q-input
      v-model="formSystem.sistema"
      stack-label
      :label="$t('text.system')"
      class="q-px-md"
    />
  </q-card-section>
  <q-card-section>
    <q-input
      v-model="formSystem.link"
      stack-label
      label="Link"
      class="q-px-md"
    />
  </q-card-section>
</template>

<script setup lang="ts">
import { verifyInputsSystems } from "./lib";
import { InputSystem } from "../../../entities/system";
const emits = defineEmits(["receveid"]);
const formSystem = reactive<InputSystem>({
  label: "",
  sublabel: "",
  icon: "",
  sistema: "gestao",
  link: "",
});
watchEffect(() => {
  if (verifyInputsSystems(formSystem)) {
    return emits("receveid", formSystem);
  }
  emits("receveid", false);
});
</script>
