<template>
  <q-input
    readonly
    label="Data Limite"
    v-model="input"
    dense
    outlined
    @click="showDatePopup = true"
    :disable="!blockSelect"
    :rules="[(val) => validateNotEmpty(val)]"
    hide-bottom-space
  >
    <q-popup-proxy>
      <div v-if="showDatePopup">
        <CardDate @dateSelected="handleDateSelected" />
      </div>
    </q-popup-proxy>
    <template #prepend>
      <q-icon
        class="custom-color full-height q-px-md"
        color="white"
        name="today"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { useEvents } from "../../../../stores/events";

const { validateNotEmpty } = useFieldValidation();
const emits = defineEmits(["envityDateLimit"]);
const eventStorage = useEvents();
const input = ref();
const showDatePopup = ref(false);
const handleDateSelected = (date: string) => {
  showDatePopup.value = false;
  input.value = date;
  emits("envityDateLimit", date);
};
const blockSelect = ref();

watchEffect(() => {
  if (!eventStorage.getRepeatDate) {
    return (blockSelect.value = false);
  }
  blockSelect.value = true;
});
</script>
<style scoped>
.custom-color {
  background-color: rgb(31, 73, 125);
  right: 0.7rem;
  width: 1.4rem;
}
</style>
