<template>
  <q-badge color="red" floating class="text-body2">
    <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
      {{ $t("text.eventsInMonth") }}
    </q-tooltip>
    {{ props.month.events.length }}</q-badge
  >
</template>

<script setup lang="ts">
import { Month } from "../../../stores/months";

const props = defineProps<{
  month: Month;
}>();
</script>
