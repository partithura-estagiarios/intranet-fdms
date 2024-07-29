<template>
  <q-card-section class="row text-black justify-center" vertical>
    <div
      v-for="item in props.events"
      :key="item.id"
      @click="selectEvent(item)"
      class="cursor-pointer col-3 q-px-sm q-py-sm"
    >
      <q-badge :style="`background-color:${item.location.color}`" />
      <span class="q-px-xs">{{ item.host.name }} </span>
    </div>
  </q-card-section>
  <q-dialog v-model="card">
    <q-card>
      <q-card-section class="custom-color row justify-between text-white">
        <div class="q-pa-md text-h5 font-custom text-white">
          {{ eventSelected.rules }}
        </div>
        <q-icon
          name="close"
          class="pt-2 cursor-pointer"
          size="3rem"
          @click="card = !card"
        />
      </q-card-section>
      <q-separator />
      <DialogScheduleRoom :event-show="eventSelected" />
    </q-card>
  </q-dialog>
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
</style>
