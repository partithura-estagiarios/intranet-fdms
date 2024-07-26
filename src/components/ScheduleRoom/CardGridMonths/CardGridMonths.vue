<template>
  <div class="row">
    <q-card v-for="month in monthsAux" class="color-custom q-py-md col-3">
      <q-item>
        <q-item-section>
          <q-item-label class="text-hover-custom cursor-pointer">{{
            $t(`label.months.${month.label}`)
          }}</q-item-label>
          <q-item-label class="text-hover-custom cursor-pointer"></q-item-label>
          <q-badge color="red" floating>12</q-badge>
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { monthsAux } from "./lib";
</script>

<style scoped>
.color-custom {
  color: rgb(31, 73, 125);
}
.text-hover-custom:hover {
  color: green;
}
</style>
