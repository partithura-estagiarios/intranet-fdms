<template>
  <q-card class="text-h3 text-uppercase text-indigo-8">
    {{ formattedMonth }}
  </q-card>
</template>

<script setup lang="ts">
import { countryCodes } from "./lib";
const props = defineProps({
  selectDate: {
    type: String,
    default: "",
  },
});
const formattedMonth = computed(() => {
  const date = new Date(props.selectDate);
  return monthFormatter().format(date) + " " + date.getFullYear();
});
const country = ref("BR");
function monthFormatter() {
  try {
    return new Intl.DateTimeFormat(locale.value || undefined, {
      month: "long",
      timeZone: "UTC",
    });
  } catch (e) {}
}
const locale = computed(() => {
  if (country.value) {
    return countryCodes[country.value];
  }
  return "en-CA";
});
</script>
