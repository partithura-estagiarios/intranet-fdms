<template>
  <q-card class="limit-size-date">
    <q-date
      v-model="date"
      mask="DD/MM/YYYY"
      class="text-black q-px-xl"
      @update:model-value="updateDate"
      :locale="myLocale"
      minimal
    />
  </q-card>
</template>

<script setup lang="ts">
import { myLocale } from "./lib";
const date = ref("");
const emits = defineEmits(["dateSelected"]);

const updateDate = (date: string) => {
  emits("dateSelected", date);
};
</script>

<style scoped>
.custom-color {
  color: rgb(31, 73, 125);
}
.limit-size-date {
  width: 16rem;
  right: 3.5rem;
}
</style>
