<template>
  <div class="row">
    <q-card
      v-for="month in monthsStorage.months"
      class="color-custom q-py-md col-3"
    >
      <q-item>
        <q-item-section>
          <q-item-label class="text-hover-custom cursor-pointer">{{
            $t(`label.months.${month.name}`)
          }}</q-item-label>
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
onMounted(async () => {
  await monthsStorage.loadEvents(monthsAux);
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
