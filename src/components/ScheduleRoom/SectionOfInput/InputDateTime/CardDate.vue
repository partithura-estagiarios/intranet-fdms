<template>
  <q-card class="limit-size-date">
    <q-date
      v-model="date"
      mask="YYYY/MM/DD"
      class="text-black q-px-xl"
      @update:model-value="updateDate"
      minimal
    />
  </q-card>
</template>

<script setup lang="ts">
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
