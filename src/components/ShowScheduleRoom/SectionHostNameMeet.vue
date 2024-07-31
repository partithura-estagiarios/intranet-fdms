<template>
  <q-card-section class="row color-custom q-px-sm justify-between">
    <div class="text-weight-bold q-px-sm">
      <q-icon name="person" size="sm" />
      {{ $t("text.organizer") }}: {{ room.host.name }}
    </div>
    <div class="text-weight-bold q-px-sm">
      <q-icon name="people" size="sm" />
      {{ $t("text.participants") }}: {{ room.totalPeoples }}
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
