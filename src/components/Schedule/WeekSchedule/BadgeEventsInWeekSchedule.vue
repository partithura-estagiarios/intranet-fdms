<template>
  <div v-for="(event, index) in getEventsByDate(props.data)">
    <div v-if="shouldDisplayEvent(index)" cliclable @click="selectEvent(event)">
      <q-badge
        rounded
        :style="`background-color:${event.location.color}`"
        class="justify-center q-py-sm q-px-xl text-black"
      >
        {{ event.host.name }}
      </q-badge>
    </div>
  </div>
  <q-dialog v-model="card">
    <q-card>
      <q-card-section class="custom-color row justify-between text-white">
        <div class="q-pa-md text-h5 font-custom text-white">
          {{ eventSelect.rules }}
        </div>
        <q-icon
          name="close"
          class="pt-2 cursor-pointer"
          size="45px"
          @click="card = !card"
        />
      </q-card-section>
      <DialogScheduleRoom :event-show="eventSelect" />
    </q-card>
  </q-dialog>
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
const card = ref(false);

function getEventsByDate(date: string) {
  return props.events.filter((event) => {
    const eventDate = new Date(event.finalTime.toString());
    return formatDate(eventDate) === date;
  });
}
const shouldDisplayEvent = computed(
  () => (index: number) => index < MAX_EVENTS,
);
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
