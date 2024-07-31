<template>
  <q-card-section>
    <div class="row text-weight-bold text-green">
      <q-icon name="event" size="sm" />
      {{ $t("text.hourInitial") }}: {{ getHours(room.initialTime) }}
      <q-space class="q-px-md" /> <q-icon name="event" size="sm" />
      {{ $t("text.hourFinal") }}:
      {{ getHours(room.finalTime) }}
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { getHours } from "./lib";
const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
