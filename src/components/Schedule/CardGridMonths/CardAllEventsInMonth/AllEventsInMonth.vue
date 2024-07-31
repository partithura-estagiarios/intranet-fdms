<template>
  <q-card-section
    class="row text-black justify-center size-list scroll"
    vertical
  >
    <q-list
      v-for="item in props.events"
      :key="item.id"
      @click="selectEvent(item)"
      class="cursor-pointer q-px-sm q-py-sm"
    >
      <q-badge :style="`background-color:${item.location.color}`" />
      <span class="q-px-xs">{{ item.host.name }} </span>
    </q-list>
  </q-card-section>
  <DialogScheduleRoom :event-show="eventSelected" />
</template>

<script setup lang="ts">
import { EventRoom } from "../../../../entities/scheduleRoom";
import { DateTime } from "luxon";
const props = defineProps({
  events: {
    type: Array as () => EventRoom[],
    required: true,
  },
});

const card = ref();
const eventSelected = ref();
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
</script>
<style scoped>
.custom-color {
  background-color: rgb(31, 73, 125);
}
.font-custom {
  font-family: Fira Sans;
}
.size-list {
  max-height: 40rem;
  color: rgb(31, 73, 125);
}
</style>
