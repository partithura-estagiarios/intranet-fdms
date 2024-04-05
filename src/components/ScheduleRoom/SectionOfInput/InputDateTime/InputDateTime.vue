<template>
  <InputTime
    class="col-6"
    :label="$t('text.startDateAndTime')"
    :dateInput="dateInitial"
    @envity-dates="(item) => (dateInitialFormated = item)"
  />
  <InputTime
    class="col-6"
    :label="$t('text.endDateAndTime')"
    @envity-dates="(item) => (dateFinalFormated = item)"
    :dateInput="dateFinal"
  />
</template>

<script setup lang="ts">
const emits = defineEmits(["envityDates"]);
const dateInitial = ref();
const dateFinal = ref();
const dateInitialFormated = ref();
const dateFinalFormated = ref();

const props = defineProps({
  selectDate: {
    type: String,
    default: "",
  },
});
watchEffect(() => {
  if (props.selectDate) {
    dateInitial.value = props.selectDate;
    dateFinal.value = props.selectDate;
  }
  emits("envityDates", dateInitialFormated.value, dateFinalFormated.value);
});
</script>
