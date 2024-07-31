<template>
  <q-card-section class="row color-custom q-px-sm justify-between">
    <div class="text-weight-bold q-px-sm">
      <q-icon name="call" size="sm" />
      {{ $t("text.ramal") }}: {{ room.host.ramalNumber }}
    </div>
    <div class="text-weight-bold q-px-sm">
      <q-icon name="credit_card" size="sm" />
      {{ $t("text.registration") }}: {{ room.host.userRegistration }}
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
