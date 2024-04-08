<template>
  <q-expansion-item v-if="hasEventsForDate(props.data)">
    <template v-slot:header>
      <div
        v-for="event in getEventsByDate(props.data)"
        class="row items-center"
      >
        <q-badge rounded :color="event.colorRoom">
          <q-tooltip>
            {{ event.userCreated.name }}
          </q-tooltip>
        </q-badge>
      </div>
    </template>
    <template v-for="event in getEventsByDate(props.data)">
      <div>
        <q-badge rounded :color="event.colorRoom" @click="selectEvent(event)" />
        {{ event.userCreated.name }}
        <q-dialog v-model="card">
          <q-card class="my-card">
            <DialogHeader
              @close="(val) => (card = val)"
              :option="event.rules"
            />
            <q-separator />
            <DialogScheduleRoom :event-show="testEvent" />
          </q-card>
        </q-dialog>
      </div>
    </template>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { formatDate } from "./lib";
import DialogScheduleRoom from "../../ShowScheduleRoom/DialogScheduleRoom.vue";
import { Event } from "../../../entities/scheduleRoom";
const props = defineProps({
  data: {
    type: String,
    default: "",
  },
  events: {
    type: Array as () => Event[],
    default: () => [],
  },
});
const card = ref();
const testEvent = ref();
function selectEvent(event: object) {
  card.value = true;
  testEvent.value = event;
}
function hasEventsForDate(date: string) {
  return props.events.some((event) => {
    const eventDate = new Date(event.finalTime); // Converter string para Date
    return formatDate(eventDate) === date;
  });
}

function getEventsByDate(date: string) {
  return props.events.filter((event) => {
    const eventDate = new Date(event.finalTime); // Converter string para Date
    return formatDate(eventDate) === date;
  });
}
</script>
