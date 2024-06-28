<template>
  <div @click="showDatePopup = true">
    <q-input
      class="border"
      readonly
      :label="dateReceived"
      v-bind="$attrs"
      v-model="input"
    >
      <template #prepend>
        <q-icon
          name="event"
          class="custom-color full-height q-px-md"
          color="white"
        />
      </template>
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
import { ref } from "vue";
import { useEvents } from "../../../../stores/events";

const eventStorage = useEvents();
const emits = defineEmits(["envityDates", "repeatDate"]);
const props = defineProps({
  label: { type: String, required: true },
});

const input = ref("");
const dateReceived = ref(props.label);
const showDatePopup = ref(false);
const showTimePopup = ref(false);

const handleDateSelected = (date: string) => {
  showDatePopup.value = false;
  input.value = date;
  showTimePopup.value = true;
  emits("repeatDate", date);
};

const handleTimeSelected = (time: string) => {
  showTimePopup.value = false;
  input.value = input.value + " " + time;
  emits("envityDates", input.value);
  showDatePopup.value = false;
};

watchEffect(() => {
  if (eventStorage.getDateSelected) {
    showDatePopup.value = false;
    input.value = eventStorage.getDateSelected;
    showTimePopup.value = true;
  }
});
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
