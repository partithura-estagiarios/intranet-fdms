<template>
  <q-item>
    <div
      v-for="(event, index) in getEventsByDate(props.data)"
      class="row items-center"
    >
      <div v-if="shouldDisplayEvent(index)">
        <q-badge rounded :style="`background-color:${event.location.color}`">
          <q-tooltip>
            {{ event.host.name }}
          </q-tooltip>
        </q-badge>
      </div>
    </div>
    <div v-if="getEventsByDate(props.data).length > MAX_EVENTS">
      ...
      <q-tooltip>
        +{{ getEventsByDate(props.data).length - MAX_EVENTS }}</q-tooltip
      >
    </div>
  </q-item>
</template>

<script setup lang="ts">
import { formatDate } from "./lib";
import { EventRoom } from "../../../entities/scheduleRoom";
const MAX_EVENTS = 8;
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

function getEventsByDate(date: string) {
  return props.events.filter((event) => {
    const eventDate = new Date(event.finalTime.toString());
    return formatDate(eventDate) === date;
  });
}
const shouldDisplayEvent = computed(
  () => (index: number) => index < MAX_EVENTS,
);
</script>
