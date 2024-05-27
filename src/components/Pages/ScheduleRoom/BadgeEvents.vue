<template>
  <q-item v-if="hasEventsForDate(props.data)">
    <div
      v-for="(event, index) in getEventsByDate(props.data)"
      class="row items-center"
    >
      <div v-if="index < 9">
        <q-badge rounded :color="event.colorRoom">
          <q-tooltip>
            {{ event.userCreated.name }}
          </q-tooltip>
        </q-badge>
      </div>
    </div>
    <div v-if="getEventsByDate(props.data).length > 8">
      ... <q-tooltip> +{{ getEventsByDate(props.data).length - 8 }}</q-tooltip>
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
