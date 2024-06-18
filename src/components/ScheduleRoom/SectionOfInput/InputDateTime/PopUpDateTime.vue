<template>
  <q-popup-proxy>
    <q-card class="limit-size-date">
      <q-date
        v-model="date"
        mask="YYYY/MM/DD"
        class="text-black q-px-xl"
        @update:model-value="updateDate"
        minimal
        v-if="showTime === DATE_MODAL"
      />
    </q-card>
    <q-time
      v-if="showTime === TIME_MODAL"
      v-model="time"
      mask="HH:mm"
      format24h
      class="text-black position-watcher"
      color="grey"
      @update:model-value="updateTime"
    />
  </q-popup-proxy>
</template>

<script setup lang="ts">
const DATE_MODAL = 1;
const TIME_MODAL = 2;
const RESET_MODAL = 0;

const date = ref("");
const time = ref("");
const showTime = ref();

const emits = defineEmits(["dateSelected", "timeSelected"]);

const props = defineProps({
  showTime: {
    type: Boolean,
    required: true,
  },
});

const updateDate = (value: string) => {
  date.value = value;
  showTime.value = TIME_MODAL;
};

const updateTime = () => {
  emits("dateSelected", date.value, time.value);
  showTime.value = RESET_MODAL;
};

watchEffect(() => {
  if (props.showTime) {
    showTime.value = DATE_MODAL;
    date.value = "";
    time.value = "";
  }
});
</script>

<style scoped>
.custom-color {
  color: rgb(31, 73, 125);
}
.limit-size-date {
  width: 16rem;
  right: 3.5rem;
}
</style>
