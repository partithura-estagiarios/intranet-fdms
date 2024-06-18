<template>
  <div class="q-pa-sl" @click="openModal = true">
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
      <PopUpDateTime @dateSelected="handleDateSelected" :showTime="openModal" />
    </q-input>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["envityDates", "envityHour"]);
const props = defineProps({
  label: { type: String, required: true },
  dateInput: { type: String, required: true },
});
const openModal = ref(false);
const input = ref("");
const dateReceived = ref(props.label);
const handleDateSelected = (date: string, time: string) => {
  input.value = date + " " + time;
  openModal.value = false;
  emits("envityDates", input);
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
