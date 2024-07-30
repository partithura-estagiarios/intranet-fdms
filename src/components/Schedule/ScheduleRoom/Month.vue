<template>
  <q-card class="text-h3 text-uppercase q-px-md">
    <div class="custom-color">
      {{ formattedMonth }}
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { DateTime } from "luxon";
import { countryCodes } from "./lib";
const props = defineProps({
  selectDate: {
    type: String,
    default: "",
  },
});
const formattedMonth = computed(() => {
  const date = DateTime.fromISO(props.selectDate).toJSDate();
  return monthFormatter().format(date) + " " + date.getFullYear();
});
const country = ref("BR");
function monthFormatter(): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(locale.value || undefined, {
    month: "long",
    timeZone: "UTC",
  });
}
const locale = computed(() => {
  if (country.value) {
    return countryCodes[country.value];
  }
  return "pt-BR";
});
</script>
<style scoped>
.custom-color {
  color: rgb(31, 73, 125);
}
</style>
