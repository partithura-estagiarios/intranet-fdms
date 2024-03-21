<template>
  <InputTime
    class="col-6"
    :label="$t('text.startDateAndTime')"
    :dateInput="date1"
    @envity-dates="(item) => (date1 = item)"
  />
  <InputTime
    class="col-6"
    :label="$t('text.endDateAndTime')"
    @envity-dates="(item) => (date2 = item)"
    :dateInput="date2"
  />
</template>

<script setup lang="ts">
import { ref, defineEmits, watchEffect } from "vue";

const emits = defineEmits(["envityDates"]);
const date1 = ref();
const date2 = ref();

watchEffect(() => {
  emits("envityDates", date1.value, date2.value);
});
</script>
