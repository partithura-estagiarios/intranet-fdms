<template>
  <div v-for="(event, index) in getEventsByDate(props.data)">
    <div cliclable @click="selectEvent(event)">
      <q-badge
        rounded
        :style="`background-color:${event.location.color}`"
        class="justify-center q-px-xl text-black text-body1"
      >
        {{ event.host.name }}
      </q-badge>
    </div>
  </div>
  <DialogScheduleRoom :event-show="eventSelect" />
</template>

<script setup lang="ts">
import { DateTime } from "luxon";
import { EventRoom } from "../../../entities/scheduleRoom";
import { formatDate } from "../ScheduleRoom/lib";
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
const eventSelect = ref();

function getEventsByDate(date: string) {
  return props.events.filter((event) => {
    const eventDate = new Date(event.finalTime.toString());
    return formatDate(eventDate) === date;
  });
}

function selectEvent(event: EventRoom) {
  const initialTime = DateTime.fromISO(event.initialTime.toString()).plus({
    hours: 3,
  });
  const finalTime = DateTime.fromISO(event.finalTime.toString()).plus({
    hours: 3,
  });
  const auxEvent = {
    ...event,
    initialTime: DateTime.fromISO(initialTime.toString()),
    finalTime: DateTime.fromISO(finalTime.toString()),
  };
  eventSelect.value = auxEvent;
}
</script>
