<template>
  <div @click="openPopup">
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
      <PopUpDateTime @dateSelected="handleDateSelected" :showTime="popUp" />
    </q-input>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["envityDates", "envityHour"]);
const props = defineProps({
  label: { type: String, required: true },
  dateInput: { type: String, required: true },
});
const popUp = ref(false);

const input = ref("");
const dateReceived = ref(props.label);
const handleDateSelected = (date: string, time: string) => {
  input.value = date + " " + time;
  popUp.value = false;
  emits("envityDates", input);
};
const openPopup = () => {
  popUp.value = true;
};
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
