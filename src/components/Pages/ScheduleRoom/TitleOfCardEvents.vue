<template>
  <div class="row">
    <q-btn
      flat
      icon="arrow_back"
      class="custom-color q-py-lg"
      size="xl"
      @click="eventStorage.oldData"
    />
    <div class="q-py-md">
      <q-separator color="green" size="0.1rem" />
      <q-chip
        color="transparent"
        class="text-capitalize text-indigo-8 text-h6 font-custom"
        >{{ dateFull.weekDay }}</q-chip
      >
      <q-separator color="green" size="0.1rem" />
    </div>
    <div class="text-h1 custom-color font-custom q-px-md">
      {{ dateFull.day }}
    </div>
    <div class="q-py-md">
      <q-separator color="green" size="0.1rem" />
      <q-chip
        color="transparent"
        class="text-capitalize text-indigo-8 text-h6 font-custom"
        >{{ dateFull.month }}</q-chip
      >
      <q-separator color="green" size="0.1rem" />
    </div>
    <q-btn
      flat
      @click="eventStorage.nextData"
      icon="arrow_forward"
      clickable
      class="custom-color q-py-lg"
      size="xl"
    />
  </div>
</template>

<script setup lang="ts">
import { useEvents } from "../../../stores/events";
const eventStorage = useEvents();
const dateFull = reactive({
  day: "",
  weekDay: "",
  month: "",
});
watchEffect(() => {
  if (eventStorage.dataFull) {
    const fullDate = eventStorage.getFullData;
    dateFull.day = fullDate.day;
    dateFull.weekDay = fullDate.weekDay;
    dateFull.month = fullDate.month;
  }
});
</script>

<style scoped>
.custom-color {
  color: rgb(31, 73, 125);
}
.font-custom {
  font-family: Fira Sans;
}
</style>
