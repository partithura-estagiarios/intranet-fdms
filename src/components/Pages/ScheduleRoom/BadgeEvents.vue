<template>
  <q-item v-if="hasEventsForDate(props.data)">
    <div
      v-for="(event, index) in getEventsByDate(props.data)"
      class="row items-center"
    >
      <div v-if="shouldDisplayEvent(index)">
        <q-badge
          rounded
          :color="event.colorRoom"
          @click.stop="selectEvent(event)"
        >
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
  <q-dialog v-model="card">
    <q-card>
      <DialogHeader
        @close="(val) => (card = val)"
        :option="eventSelected.rules"
      />
      <q-separator />
      <DialogScheduleRoom :event-show="eventSelected" />
    </q-card>
  </q-dialog>
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
const eventSelected = ref();
function selectEvent(event: object) {
  card.value = true;
  eventSelected.value = event;
}
const card = ref(false);
function hasEventsForDate(date: string) {
  return props.events.some((event) => {
    const eventDate = new Date(event.finalTime.toString());
    return formatDate(eventDate) === date;
  });
}

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
