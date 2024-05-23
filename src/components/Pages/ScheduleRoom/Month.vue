<template>
  <div class="row rounded-borders outline text-indigo bg-white">
    <div
      class="font-custom text-capitalize text-h4 text-indigo q-px-lg q-py-sm"
    >
      {{ formattedMonth }}
    </div>
    <div class="bg-indigo text-indigo">
      <q-icon
        name="mdi-calendar-cursor"
        class="q-py-sm q-px-sm position-icon"
        size="2rem"
        color="white"
      />
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
  font-family: Fira sans;
}
.position-icon {
  top: 0.35rem;
}
</style>
