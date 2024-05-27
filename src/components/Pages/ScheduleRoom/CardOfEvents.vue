<template>
  <div class="row justify-center">
    <TitleOfCardEvents class="q-py-md no-wrap" />
    <q-list padding class="size-list scroll">
      <q-item
        clickable
        v-ripple
        v-for="event in events"
        @click="selectEvent(event)"
      >
        <q-item-section>
          <div class="row items-center text-h6 font-custom">
            <q-badge color="red" />
            <span>{{ event.userCreated.name }} - </span>
            <span>{{ event.rules }}</span>
          </div>
          <span class="text-bold font-custom"
            >{{ getHours(new Date(event.initialTime)) }} -
            {{ getHours(new Date(event.finalTime)) }}</span
          >
        </q-item-section>
        <q-dialog v-model="card">
          <q-card class="my-card">
            <DialogHeader
              @close="(val) => (card = val)"
              :option="event.rules"
            />
            <q-separator />
            <DialogScheduleRoom :event-show="eventSelected" />
          </q-card>
        </q-dialog>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { getHours } from "./lib";
import { EventRoom } from "../../../entities/scheduleRoom";
import { useEvents } from "../../../stores/events";
const eventStorage = useEvents();
const props = defineProps({
  daysEvents: {
    type: Array as PropType<EventRoom[]>,
    required: true,
  },
});
const eventSelected = ref();
const card = ref(false);
const events = ref();
watchEffect(async () => {
  if (eventStorage.dataFull) {
    events.value = await eventStorage.loadEvents();
  }
});
function selectEvent(event: object) {
  card.value = true;
  eventSelected.value = event;
}
onMounted(() => {
  events.value = props.daysEvents;
});
</script>
<style scoped>
.font-custom {
  font-family: Fira Sans;
}
.size-list {
  max-height: 40rem;
  scrollbar-gutter: stable both-edges;
  position: relative;
  padding-right: 20.2rem;
}
</style>
