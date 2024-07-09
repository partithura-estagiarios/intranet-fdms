<template>
  <div class="row justify-center">
    <TitleOfCardEvents class="q-py-md no-wrap" />
    <q-list padding class="size-list scroll">
      <q-item v-ripple v-for="event in events" :key="event.id">
        <q-item-section class="text-no-wrap" @click="selectEvent(event)">
          <div class="items-center text-h6 font-custom">
            <q-badge class="q-mx-sm no-wrap" :color="event.colorRoom" />
            <span>{{ event.host.name }} - </span>
            <span>{{ event.rules }}</span>
            <MenuOptsRoom
              @exclude="excludeEvent(event.id)"
              :meet="event"
              @edit="(val) => editEvent(val.value)"
            />
          </div>
          <span class="text-bold font-custom q-px-lg">
            {{ getHours(event.initialTime) }} -
            {{ getHours(event.finalTime) }}
          </span>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
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
import { insertColor, getHours, convertDateTimeTo0300Z } from "./lib";
import { EventRoom, EditEventInterface } from "../../../entities/scheduleRoom";
import { useEvents } from "../../../stores/events";
import ExcludeMeet from "../../../graphql/scheduleRoom/ExcludeMeet.gql";
import EditMeet from "../../../graphql/scheduleRoom/EditMeet.gql";
import { DateTime } from "luxon";
import { StatusCreateMeeting } from "../../../support/contracts";
const emits = defineEmits(["reloadEvent", "close", "editSuccess"]);
const { t } = useI18n();
const eventStorage = useEvents();
const props = defineProps({
  daysEvents: {
    type: Array as PropType<EventRoom[]>,
    required: true,
  },
});
const eventSelected = ref();
const card = ref(false);
const events: Ref<EventRoom[]> = ref([]);
watchEffect(async () => {
  if (eventStorage.dataFull) {
    reloadEvents();
  }
});
const notifyUser = (message: string, type: string) => {
  if (type === StatusCreateMeeting.SUCCESS) {
    return positiveNotify(message);
  }
  if (type === StatusCreateMeeting.DATE_CONFLICT) {
    return negativeNotify(message);
  }
  negativeNotify(message);
};
async function reloadEvents() {
  const auxEvents = await eventStorage.loadEvents(eventStorage.dataFull);
  if (auxEvents.length) {
    auxEvents.forEach((event) => {
      event.colorRoom = insertColor(event.location);
    });
    return (events.value = auxEvents);
  }
  emits("close");
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
async function excludeEvent(eventId: string) {
  const { excludeMeet }: { excludeMeet: Boolean } = await runMutation(
    ExcludeMeet,
    { id: eventId },
  );
  if (excludeMeet) {
    await reloadEvents();
    emits("reloadEvent");
    return positiveNotify(t("text.meetCanceled"));
  }
  return negativeNotify(t("text.meetCanceledError"));
}

async function editEvent(event: EditEventInterface) {
  const initialTime = event.initialTime.toString().endsWith("Z")
    ? event.initialTime
    : convertDateTimeTo0300Z(event.initialTime);
  const finalTime = event.finalTime.toString().endsWith("Z")
    ? event.finalTime
    : convertDateTimeTo0300Z(event.finalTime);
  const auxEvent = {
    ...event,
    totalPeoples: event.totalPeoples.toString(),
    initialTime: initialTime,
    finalTime: finalTime,
  };
  const { editMeet }: { editMeet: string } = await runMutation(EditMeet, {
    room: auxEvent,
  });
  notifyUser(t(`userScheduleRoom.${editMeet}`), editMeet);
  reloadEvents();
  emits("editSuccess");
}
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
  color: rgb(31, 73, 125);
}
</style>
