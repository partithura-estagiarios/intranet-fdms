<template>
  <div class="row justify-around">
    <InputTime
      :label="$t('text.startDateAndTime')"
      class="col q-mr-sm"
      :dateInput="dateInitial"
      @envity-dates="(item) => (dateInitialFormated = item)"
    />

    <InputTime
      :label="$t('text.endDateAndTime')"
      class="col"
      @envity-dates="(item) => (dateFinalFormated = item)"
      :dateInput="dateFinal"
    />
  </div>
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
