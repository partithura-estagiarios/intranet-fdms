<template>
  <div class="row rounded-borders">
    <div class="rounded-borders text-capitalize text-h3 text-indigo outline">
      {{ formattedMonth }}
    </div>
    <div class="bg-indigo outline text-indigo">
      <q-icon name="mdi-calendar-cursor" size="xl" color="white" />
    </div>
  </div>
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
  return monthFormatter().format(date);
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
<style scoped>
.font-custom {
  font-family: Fire sans;
}
</style>
