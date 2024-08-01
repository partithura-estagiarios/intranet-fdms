<template>
  <CardOfEvents
    :daysEvents="eventsDay"
    @reloadEvent="loadSchedule()"
    @close="closeCardEvents()"
    @editSuccess="loadSchedule()"
    :cardEvents="cardEvents"
    @closeCardEvents="cardEvents = false"
  />
  <q-calendar-month
    ref="calendar"
    v-model="selectedDate"
    locale="pt-br"
    :day-min-height="MIN_DAY_HEIGHT"
    @click-day="onClickDay"
    class="cursor-pointer"
  >
    <template #head-day="{ scope: { timestamp } }">
      <div class="fit row justify-center text-white custom-color">
        {{ getHeadDay(timestamp) }}
      </div>
    </template>
    <template #day="{ scope: { timestamp } }">
      <BadgeEvents :data="timestamp.date" :events="events" />
    </template>
  </q-calendar-month>
</template>

<script setup lang="ts">
import { QCalendarMonth, today } from "@quasar/quasar-ui-qcalendar/";
import ScheduleRoomLoad from "../../../graphql/scheduleRoom/ScheduleRoomLoad.gql";
import { MIN_DAY_HEIGHT } from "../../../support/constants";
import { createEvent, getHeadDay } from "../ScheduleRoom/lib";
import { DateTime } from "luxon";
import { useEvents } from "../../../stores/events";
import { CalendarItem, EventRoom } from "../../../entities/scheduleRoom";
import { warningNotify } from "../../../helpers";

const eventsDay = ref();
const eventStorage = useEvents();
const { t } = useI18n();
const selectedDate = ref<string>(today());
const events = ref();
const cardEvents = ref();
const props = defineProps({
  reload: {
    type: Boolean,
    required: true,
  },
});

const onClickDay = async (data: CalendarItem) => {
  const { date, time } = data.scope.timestamp;
  eventsDay.value = events.value.filter((event: EventRoom) => {
    const eventInitialDate = DateTime.fromISO(
      event.initialTime.toString(),
    ).toISODate();
    const eventFinalDate = DateTime.fromISO(
      event.finalTime.toString(),
    ).toISODate();
    return eventInitialDate === date || eventFinalDate === date;
  });
  if (eventsDay.value.length) {
    eventStorage.dataFull = date.toString();
    cardEvents.value = true;
    return eventsDay;
  }
  warningNotify(t(`text.noMoreEvents`));
};

async function loadSchedule() {
  const { scheduleRoomLoad } = (await runQuery(ScheduleRoomLoad)) as {
    scheduleRoomLoad: EventRoom[];
  };
  scheduleRoomLoad.forEach((event) => {
    const initialTime = DateTime.fromISO(event.initialTime.toString()).plus({
      hours: 3,
    });
    const finalTime = DateTime.fromISO(event.finalTime.toString()).plus({
      hours: 3,
    });

    event.initialTime = DateTime.fromISO(initialTime.toString());
    event.finalTime = DateTime.fromISO(finalTime.toString());
  });
  events.value = createEvent(scheduleRoomLoad);
}

function closeCardEvents() {
  cardEvents.value = false;
  loadSchedule();
  warningNotify(t(`text.noMoreEvents`));
}

watchEffect(() => {
  if (eventStorage.closeModal) {
    warningNotify(t(`text.noMoreEvents`));
    return eventStorage.toggleCloseModal;
  }
});

onMounted(() => {
  loadSchedule();
});

watchEffect(() => {
  if (props.reload) {
    loadSchedule();
  }
});
</script>
<style scoped>
.custom-color {
  background-color: rgb(31, 73, 125);
}
.calendar-size {
  width: 60rem;
}
.font-custom {
  font-family: Fira Sans;
}
</style>
