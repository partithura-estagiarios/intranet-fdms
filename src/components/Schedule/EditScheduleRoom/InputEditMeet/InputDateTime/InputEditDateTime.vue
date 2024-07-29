<template>
  <div @click="showDatePopup = true">
    <q-input
      class="border"
      readonly
      v-bind="$attrs"
      v-model="input"
      :label="props.title"
    >
      <q-popup-proxy>
        <div v-if="showDatePopup && !showTimePopup">
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
import { formatDate } from "./lib";
const emits = defineEmits(["envityDates"]);
const props = defineProps({
  label: { type: String, required: true },
  title: { type: String, required: true },
});

const input = ref("");
const showDatePopup = ref(false);
const showTimePopup = ref(false);

const handleDateSelected = (date: string) => {
  showDatePopup.value = false;
  input.value = date;
  showTimePopup.value = true;
};

const handleTimeSelected = (time: string) => {
  showTimePopup.value = false;
  input.value = input.value + " " + time;
  emits("envityDates", input.value);
  showDatePopup.value = false;
};

watchEffect(() => {
  if (props.label) {
    input.value = props.label;
  }
});
</script>
