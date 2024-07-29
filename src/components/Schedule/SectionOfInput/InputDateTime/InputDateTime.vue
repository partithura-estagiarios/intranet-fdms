<template>
  <div class="row justify-around">
    <InputTime
      :label="$t('text.startDateAndTime')"
      class="col"
      :dateInput="dateInitial"
      @envity-dates="receivedDateInitial"
    />
    <q-space class="q-px-md" />
    <InputTime
      :label="$t('text.endDateAndTime')"
      class="col position-custom"
      @envity-dates="receivedDateFinal"
      :dateInput="dateFinal"
    />
  </div>
</template>

<script setup lang="ts">
import { useEvents } from "../../../../stores/events";
const emits = defineEmits(["envityDates"]);
const eventStorage = useEvents();
const dateInitial = ref();
const dateFinal = ref();

const props = defineProps({
  selectDate: {
    type: String,
    default: "",
  },
});

function receivedDateInitial(val: string) {
  dateInitial.value = val;
}

function receivedDateFinal(val: string) {
  dateFinal.value = val;
}
watchEffect(() => {
  if (props.selectDate) {
    dateInitial.value = props.selectDate;
    dateFinal.value = props.selectDate;
  }
  emits("envityDates", dateInitial.value, dateFinal.value);
});

watchEffect(() => {
  if (dateFinal.value && dateInitial.value) {
    eventStorage.isSameDate(dateFinal.value, dateInitial.value);
  }
});
</script>
<style scoped>
.position-custom {
  right: 1rem;
  position: relative;
}
</style>
