<template>
  <div @click="showPopup">
    <q-input
      class="border"
      :label="dateReceived"
      v-bind="$attrs"
      v-model="input"
      dense
      hide-bottom-space
      :rules="[(val) => validateDateTime(val)]"
      @input="handleInput"
    >
      <template #prepend>
        <q-icon
          name="event"
          class="custom-color full-height q-px-md"
          color="white"
        />
      </template>
      <q-popup-proxy>
        <div v-if="showDatePopup">
          <CardDate @dateSelected="handleDateSelected" />
        </div>
        <div v-if="showTimePopup">
          <CardTime @timeSelected="handleTimeSelected" />
        </div>
      </q-popup-proxy>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { useFieldValidation } from "../../../../composables/rules";

const { validateDateTime } = useFieldValidation();
const emits = defineEmits(["envityDates"]);
const props = defineProps({
  label: { type: String, required: true },
});

const input = ref();
const inputDate = ref("");
const inputTime = ref("");
const dateReceived = ref(props.label);

const showDatePopup = ref(false);
const showTimePopup = ref(false);

const handleDateSelected = (date: string) => {
  inputDate.value = date;
  input.value = date + (" " + inputTime.value);
  showDatePopup.value = false;
  showTimePopup.value = !inputTime.value;
};

const handleTimeSelected = (time: string) => {
  inputTime.value = time;
  input.value = `${inputDate.value} ${time}`;
  showTimePopup.value = false;
};

const handleInput = (value: string) => {
  const [datePart, timePart] = value.split(" ");
  inputDate.value = datePart;
  inputTime.value = timePart;
  if (!inputDate.value) {
    showDatePopup.value = true;
    return (showTimePopup.value = false);
  }
  if (inputDate.value && !inputTime.value) {
    showDatePopup.value = false;
    return (showTimePopup.value = true);
  }
  showDatePopup.value = false;
  return (showTimePopup.value = false);
};

const showPopup = () => {
  if (!inputDate.value && !inputTime.value) {
    return (showDatePopup.value = true);
  }
  if (inputDate.value && !inputTime.value) {
    showTimePopup.value = true;
  }
};

watch(() => input.value, handleInput);
</script>

<style scoped>
.border {
  border: 0.1rem solid rgb(31, 73, 125);
  border-radius: 0.2rem;
}
.custom-color {
  background-color: rgb(31, 73, 125);
}
</style>
