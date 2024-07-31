<template>
  <q-dialog v-model="cardEvents" :persistent="true">
    <div class="relative-position no-scroll">
      <q-card class="no-scroll" flat>
        <DialogHeader
          @close="closeCardEvents()"
          :option="$t('text.eventsDay')"
        />
        <div class="row justify-center">
          <TitleOfCardEvents class="q-py-md no-wrap" />
          <EventsInCard
            :events="events"
            @selectEvent="(val) => selectEvent(val)"
            @reloadEvent="reloadEvents()"
          />
        </div>
      </q-card>
    </div>
  </q-dialog>
  <q-dialog v-model="card">
    <q-card>
      <q-card-section class="custom-color row justify-between text-white">
        <div class="q-pa-md text-h5 font-custom text-white">
          {{ eventSelected.rules }}
        </div>
        <q-icon
          name="close"
          class="pt-2 cursor-pointer"
          size="45px"
          @click="card = !card"
        />
      </q-card-section>
      <DialogScheduleRoom :event-show="eventSelected" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { DateTime } from "luxon";
import { EventRoom } from "../../../entities/scheduleRoom";
import { useEvents } from "../../../stores/events";

const emits = defineEmits([
  "reloadEvent",
  "close",
  "editSuccess",
  "closeCardEvents",
]);
const props = defineProps({
  cardEvents: {
    type: Boolean,
    required: true,
  },
});
const eventStorage = useEvents();
const eventSelected = ref();
const card = ref(false);
const events: Ref<EventRoom[]> = ref([]);
const cardEvents = ref();

async function reloadEvents() {
  const auxEvents = await eventStorage.loadEvents(eventStorage.dataFull);
  if (auxEvents.length) {
    return (events.value = auxEvents);
  }
  events.value = auxEvents;
  cardEvents.value = false;
  emits("close");
}

function closeCardEvents() {
  cardEvents.value = false;
  emits("closeCardEvents");
}

function selectEvent(event: EventRoom) {
  card.value = true;
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
  eventSelected.value = auxEvent;
}

watchEffect(() => {
  if (props.cardEvents) {
    cardEvents.value = props.cardEvents;
  }
});
watchEffect(async () => {
  if (eventStorage.dataFull) {
    reloadEvents();
  }
});
</script>
<style scoped>
.font-custom {
  font-family: Fira Sans;
}

.custom-color {
  background-color: rgb(31, 73, 125);
}
</style>
