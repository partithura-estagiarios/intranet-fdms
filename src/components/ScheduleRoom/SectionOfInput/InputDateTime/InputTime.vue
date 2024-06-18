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
    </q-input>

    <PopUpDateTime :showPopUp="popUp" @dateSelected="handleDateSelected" />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["envityDates", "envityHour"]);
const props = defineProps({
  label: { type: String, required: true },
  dateInput: { type: String, default: "" },
});

const input = ref("");
const popUp = ref(false);
const dateReceived = ref(props.label);
const inputDate = ref();
const inputTime = ref();

const openPopup = () => {
  popUp.value = true;
};

const handleDateSelected = (date: string, time: string) => {
  input.value = date + " " + time;
  popUp.value = false;
};

watchEffect(() => {
  emits("envityDates", inputDate.value);
});

watchEffect(() => {
  emits("envityHour", inputTime.value);
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
