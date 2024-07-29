<template>
  <q-badge
    color="red"
    floating
    class="text-body2 cursor-pointer"
    @click="enableCard = true"
  >
    <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
      {{ $t("text.eventsInMonth") }}
    </q-tooltip>
    {{ props.month.events.length }}
    <CardEventsInMonth
      :open="enableCard"
      @close="enableCard = false"
      :monthName="props.month.name"
      :events="props.month.events"
    />
  </q-badge>
</template>

<script setup lang="ts">
import { Month } from "../../../stores/months";

const enableCard = ref(false);

const props = defineProps<{
  month: Month;
}>();
</script>
