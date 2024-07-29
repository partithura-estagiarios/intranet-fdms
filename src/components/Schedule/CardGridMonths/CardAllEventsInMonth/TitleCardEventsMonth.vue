<template>
  <q-card-section class="text-black row">
    <div class="border space-reserved">
      <q-btn
        flat
        icon="arrow_back"
        class="custom-color"
        size="xl"
        @click="oldMonth"
      />
    </div>
    <div class="border space-reserved-name-month">
      <q-separator color="green" size="0.1rem" />
      <q-chip
        color="transparent"
        class="text-capitalize text-indigo-8 text-h6 font-custom"
        >{{ $t(`label.months.${monthNow}`) }}</q-chip
      >
      <q-separator color="green" size="0.1rem" />
    </div>
    <div class="border space-reserved">
      <q-btn
        flat
        icon="arrow_forward"
        clickable
        class="custom-color"
        size="xl"
        @click="nextMonth"
      />
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { useMonths } from "../../../../stores/months";

const emits = defineEmits(["envityEvents"]);
const monthsStorage = useMonths();
const props = defineProps({
  monthName: {
    type: String,
    required: true,
  },
});
const monthNow = ref(props.monthName);

async function oldMonth() {
  const { events, name } = await monthsStorage.previousMonth(monthNow.value);
  monthNow.value = name;
  emits("envityEvents", events);
}
async function nextMonth() {
  const { events, name } = await monthsStorage.nextMonth(monthNow.value);
  monthNow.value = name;
  emits("envityEvents", events);
}
</script>

<style scoped>
.custom-color {
  color: rgb(31, 73, 125);
}
.font-custom {
  font-family: Fira Sans;
  align-items: center;
}
.space-reserved {
  width: 5rem;
}
</style>
