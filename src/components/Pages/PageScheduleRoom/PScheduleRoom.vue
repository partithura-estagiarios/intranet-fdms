<template>
  <Separator :texto="$t('tab.scheduler')" />
  <ToolbarCalendar
    :date="selectedDate"
    @today="onToday"
    @prev="onPrev"
    @next="onNext"
    @openModalAdd="openModalAddScheduleRoom"
  />
  <q-dialog v-model="card">
    <q-card>
      <DialogHeader
        @close="(item) => (card = item)"
        :option="$t('text.organizerEvent')"
        class="q-py-sm"
      />
      <AddScheduleRoom @reload="reloadModalAddScheduleRoom" />
      <LoadingEvent :visible="eventStorage.loading" />
    </q-card>
  </q-dialog>
  <q-dialog v-model="cardEvents">
    <div class="relative-position no-scroll">
      <q-card class="no-scroll" flat>
        <DialogHeader
          @close="(item) => (cardEvents = item)"
          :option="$t('text.eventsDay')"
        />
        <CardOfEvents
          :daysEvents="eventsDay"
          @reloadEvent="loadSchedule()"
          @close="closeCardEvents()"
          @editSuccess="loadSchedule()"
        />
      </q-card>
    </div>
  </q-dialog>
  <div class="row justify-center font-custom">
    <div class="q-px-sm">
      <ButtonGoScheduleYear @change-schedule="(val) => (slideSchedule = val)" />
    </div>
    <div class="text-h5 calendar-size text-uppercase">
      <q-slide-transition>
        <q-calendar-month
          ref="calendar"
          v-if="slideSchedule == 'month'"
          v-model="selectedDate"
          locale="pt-br"
          :day-min-height="100"
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
        <CardGridMonths
          v-if="slideSchedule == 'year'"
          @envity-month="goToSpecificMonth"
        />
      </q-slide-transition>
    </div>
  </div>
  <BagdeRooms :rooms="rooms" />
</template>

<script setup lang="ts">
import { today, QCalendarMonth } from "@quasar/quasar-ui-qcalendar/";
import ScheduleRoomLoad from "../../../graphql/scheduleRoom/ScheduleRoomLoad.gql";
import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass";
import { useEvents } from "../../../stores/events";
import LoadingEvent from "../../Loading/LoadingEvent.vue";
import { DateTime } from "luxon";
import { createEvent, getHeadDay } from "../../Schedule/ScheduleRoom/lib";
import { CalendarItem, EventRoom } from "../../../entities/scheduleRoom";

const instance = getCurrentInstance();
const eventStorage = useEvents();
const selectedDate = ref(today());
const { t } = useI18n();
const card = ref(false);
const cardEvents = ref(false);
const rooms = ref();
const slideSchedule = ref("month");
const eventsDay = ref();
const events = ref();

watchEffect(() => {
  if (eventStorage.closeModal) {
    closeCardEvents();
    return eventStorage.toggleCloseModal;
  }
});

async function closeCardEvents() {
  cardEvents.value = false;
  warningNotify(t(`text.noMoreEvents`));
}

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
  closeCardEvents();
};

function onToday() {
  if (instance && instance.refs && instance.refs.calendar) {
    (instance.refs.calendar as QCalendarMonth).moveToToday();
  }
}

function onPrev() {
  if (instance && instance.refs && instance.refs.calendar) {
    (instance.refs.calendar as QCalendarMonth).prev();
  }
}

function onNext() {
  if (instance && instance.refs && instance.refs.calendar) {
    (instance.refs.calendar as QCalendarMonth).next();
  }
}

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

const openModalAddScheduleRoom = () => {
  card.value = true;
  eventStorage.resetDateSelected();
};
const reloadModalAddScheduleRoom = async () => {
  card.value = false;
  await loadSchedule();
};
onMounted(() => {
  loadSchedule();
});
async function goToSpecificMonth(targetYear: number, targetMonth: number) {
  slideSchedule.value = "month";
  await nextTick();
  if (selectedDate) {
    const targetDate = `${targetYear}-${String(targetMonth).padStart(2, "0")}-01`;
    selectedDate.value = targetDate;
    await nextTick();
  }
}
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
