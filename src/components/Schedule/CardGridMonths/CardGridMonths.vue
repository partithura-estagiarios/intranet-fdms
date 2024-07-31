<template>
  <div class="row">
    <q-card
      v-for="month in monthsStorage.months"
      class="color-custom q-py-md col-3"
    >
      <q-item>
        <q-item-section>
          <q-item-label
            class="text-hover-custom cursor-pointer"
            @click="goToSpecificMonth(month.name)"
            >{{ $t(`label.months.${month.name}`) }}</q-item-label
          >
          <BadgeEventsInMonth :month="month" />
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { monthsAux } from "../../../stores/months";
import { useMonths } from "../../../stores/months";
import {
  RADIX_DECIMAL,
  START_INDEX,
  YEAR_LENGTH,
} from "../../../support/constants";

const props = defineProps({
  year: {
    type: String,
    required: true,
  },
  reloadCard: {
    type: Boolean,
    default: false,
  },
});
const monthsStorage = useMonths();
const emits = defineEmits(["envityMonth", "reloadDesactive"]);

onMounted(async () => {
  await monthsStorage.loadEvents(monthsAux, getYear());
});

async function goToSpecificMonth(monthName: string) {
  const month = monthsAux.find(
    (month) => month.label === monthName.toLowerCase(),
  );
  emits("envityMonth", getYear(), month?.numberMonth);
}

const getYear = () => {
  const yearString = props.year;
  return parseInt(
    yearString.substring(START_INDEX, YEAR_LENGTH),
    RADIX_DECIMAL,
  );
};

watchEffect(async () => {
  if (props.year) {
    await monthsStorage.loadEvents(monthsAux, getYear());
  }
});

watchEffect(async () => {
  if (props.reloadCard) {
    await monthsStorage.loadEvents(monthsAux, getYear());
    emits("reloadDesactive");
  }
});
</script>

<style scoped>
.color-custom {
  color: rgb(31, 73, 125);
}
.text-hover-custom:hover {
  color: green;
}
</style>
