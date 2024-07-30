<template>
  <q-card class="text-h3 text-uppercase q-px-md">
    <div class="custom-color">
      {{ labelMonth }}
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { DateTime } from "luxon";
import { countryCodes } from "./lib";
import { TIME_MAKER } from "../../../support/constants";
const props = defineProps({
  selectDate: {
    type: String,
    default: "",
  },
  viewMode: {
    type: String,
    required: true,
  },
});

const labelMonth = ref();

function formattedMonth() {
  const date = DateTime.fromISO(props.selectDate).toJSDate();
  labelMonth.value = monthFormatter().format(date) + " " + date.getFullYear();
}

function formattedYear() {
  const date = DateTime.fromISO(props.selectDate).toJSDate();
  labelMonth.value = date.getFullYear();
}

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
watchEffect(() => {
  if (props.viewMode === TIME_MAKER.MONTH) {
    return formattedMonth();
  }
  return formattedYear();
});
</script>
<style scoped>
.custom-color {
  color: rgb(31, 73, 125);
}
</style>
