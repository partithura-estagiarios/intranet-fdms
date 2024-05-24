<template>
  <q-item v-if="hasEventsForDate(props.data)">
    <div v-for="event in getEventsByDate(props.data)" class="row items-center">
      <q-badge rounded :color="event.colorRoom">
        <q-tooltip>
          {{ event.userCreated.name }}
        </q-tooltip>
      </q-badge>
    </div>
  </q-item>
</template>

<script setup lang="ts">
import { formatDate } from "./lib";
import { EventRoom } from "../../../entities/scheduleRoom";
const props = defineProps({
  data: {
    type: String,
    default: "",
  },
  events: {
    type: Array as () => EventRoom[],
    default: () => [],
  },
});

function hasEventsForDate(date: string) {
  return props.events.some((event) => {
    const eventDate = new Date(event.finalTime);
    return formatDate(eventDate) === date;
  });
}

function getEventsByDate(date: string) {
  return props.events.filter((event) => {
    const eventDate = new Date(event.finalTime);
    return formatDate(eventDate) === date;
  });
}
</script>
