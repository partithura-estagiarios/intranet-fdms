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
const monthsStorage = useMonths();
const emits = defineEmits(["envityMonth"]);
onMounted(async () => {
  await monthsStorage.loadEvents(monthsAux);
});

async function goToSpecificMonth(monthName: string) {
  const month = monthsAux.find(
    (month) => month.label === monthName.toLowerCase(),
  );
  emits("envityMonth", new Date().getFullYear(), month?.numberMonth);
}
</script>

<style scoped>
.color-custom {
  color: rgb(31, 73, 125);
}
.text-hover-custom:hover {
  color: green;
}
</style>
