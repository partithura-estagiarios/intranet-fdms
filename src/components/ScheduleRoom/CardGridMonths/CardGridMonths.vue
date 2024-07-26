<template>
  <div class="row">
    <q-card v-for="month in monthsAux" class="color-custom q-py-md col-3"
      >{{ $t(`label.months.${month.label}`) }}
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
</style>
