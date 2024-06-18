<template>
  <q-popup-proxy v-model="props.showPopUp">
    <q-date
      v-model="date"
      mask="YYYY/MM/DD"
      class="text-black"
      @update:model-value="updateDate"
      minimal
      v-if="showTime === DATE_MODAL"
    />
    <q-time
      minimal
      v-if="showTime === TIME_MODAL"
      v-model="time"
      mask="HH:mm"
      format24h
      class="text-black custom-color"
      color="indigo-10"
      @update:model-value="updateTime"
    />
  </q-popup-proxy>
</template>

<script setup lang="ts">
const DATE_MODAL = 1;
const TIME_MODAL = 2;

const emits = defineEmits(["dateSelected", "timeSelected"]);
const props = defineProps({
  showPopUp: { type: Boolean, required: true },
  finalTime: { type: String, default: "" },
});

const date = ref();
const time = ref();
const showTime = ref(DATE_MODAL);

const updateDate = (value: string) => {
  date.value = value;
  showTime.value = TIME_MODAL;
};

const updateTime = () => {
  emits("dateSelected", date.value, time.value);
  showTime.value = DATE_MODAL;
};
</script>
<style scoped>
.custom-color {
  color: rgb(31, 73, 125);
}
</style>
