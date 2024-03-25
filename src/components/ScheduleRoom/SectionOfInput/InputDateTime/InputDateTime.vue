<template>
  <InputTime
    class="col-6"
    :label="$t('text.startDateAndTime')"
    :dateInput="date1"
    @envity-dates="(item) => (date1Formated = item)"
  />
  <InputTime
    class="col-6"
    :label="$t('text.endDateAndTime')"
    @envity-dates="(item) => (date2Formated = item)"
    :dateInput="date2"
  />
</template>

<script setup lang="ts">
const emits = defineEmits(["envityDates"]);
const date1 = ref();
const date2 = ref();
const date1Formated = ref();
const date2Formated = ref();

const props = defineProps({
  selectDate: {
    type: String,
    default: "",
  },
});
watchEffect(() => {
  if (props.selectDate) {
    date1.value = props.selectDate;
    date2.value = props.selectDate;
  }
  emits("envityDates", date1Formated.value, date2Formated.value);
});
</script>
