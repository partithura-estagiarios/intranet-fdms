<template>
  <div class="row justify-around">
    <InputTime
      :label="$t('text.startDateAndTime')"
      class="col q-mr-sm"
      :dateInput="dateInitial"
      @envity-dates="receivedDateInitial"
      @repeat-date="(val) => (repeatDate1 = val)"
    />

    <InputTime
      :label="$t('text.endDateAndTime')"
      class="col"
      @envity-dates="receivedDateFinal"
      :dateInput="dateFinal"
      @repeat-date="(val) => (repeatDate2 = val)"
    />
  </div>
</template>

<script setup lang="ts">
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
const repeatDate1 = ref();
const repeatDate2 = ref();

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
  if (dateInitial && dateInitial === dateFinal) {
    console.log(dateInitial);
    return (eventStorage.dateRepeat = !eventStorage.dateRepeat);
  }
  return (eventStorage.dateRepeat = !eventStorage.dateRepeat);
});
</script>
