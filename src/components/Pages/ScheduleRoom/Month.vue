<template>
  <q-card class="text-h3 text-uppercase text-white bg-green">
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
function monthFormatter(): Intl.DateTimeFormat {
  try {
    return new Intl.DateTimeFormat(locale.value || undefined, {
      month: "long",
      timeZone: "UTC",
    });
  } catch (e) {
    console.error("Failed to create DateTimeFormat:", e);
    // Retornar um formato de data padrão em caso de erro
    return new Intl.DateTimeFormat("en-US", { month: "long" });
  }
}
const locale = computed(() => {
  if (country.value) {
    return countryCodes[country.value];
  }
  return "pt-BR";
});
</script>
