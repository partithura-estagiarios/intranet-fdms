<template>
  <div class="spacing-header">
    <q-item class="font-custom padding-top">
      <q-item-section class="items-center">
        <q-btn
          no-caps
          color="green"
          :label="$t('text.schedulEvent')"
          class="text-body1 text-white"
          @click="(card = true), (selectDate = '')"
        />
        <p class="text-green-8">
          {{ $t("text.selectDayForRoom") }}
        </p>
      </q-item-section>
      <q-item-section class="items-center">
        <Month :select-date="selectedDate" />
        <NavigationScheduleRoom
          @today="onToday"
          @prev="onPrev"
          @next="onNext"
        />
      </q-item-section>
    </q-item>
  </div>
  <q-dialog v-model="card">
    <div class="my-card relative-position no-scroll">
      <q-card class="no-scroll" flat>
        <DialogHeader
          @close="(item) => (card = item)"
          :option="$t('text.organizerEvent')"
        />
        <AddScheduleRoom
          @reload="loadSchedule(), (card = false)"
          :selectDate="selectDate"
        />
      </q-card>
    </div>
  </q-dialog>
  <q-dialog v-model="cardEvents">
    <div class="my-card relative-position no-scroll">
      <q-card class="no-scroll" flat>
        <DialogHeader
          @close="(item) => (cardEvents = item)"
          :option="$t('text.eventsDay')"
        />
        <CardOfEvents :daysEvents="eventsDay" />
      </q-card>
    </div>
  </q-dialog>
  <div class="q-pa-md row justify-center font-custom">
    <div class="text-h5 calendar-size text-uppercase">
      <q-calendar-month
        ref="calendar"
        v-model="selectedDate"
        focusable
        locale="pt-br"
        hoverable
        :day-min-height="100"
        :focus-type="['day']"
        @click-date="onClickHeadDay"
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
    </div>
  </div>
  <div class="row justify-center font-custom">
    <div v-for="(item, index) in rooms" class="col-auto q-pa-md" :key="index">
      <div class="row items-center">
        <q-badge rounded :color="item.color" class="mr-2" />
        <span>{{ $t(`text.${item.name}`) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QCalendarMonth, today } from "@quasar/quasar-ui-qcalendar/";
import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass";
import { formatDate, insertColor, rooms } from "./lib";
import {
  CalendarItem,
  CalendarTimeStamp,
  EventRoom,
} from "../../../entities/scheduleRoom";
import ScheduleRoomLoad from "../../../graphql/scheduleRoom/ScheduleRoomLoad.gql";
import { useEvents } from "../../../stores/events";
const eventStorage = useEvents();
const selectedDate = ref(today());
const { t } = useI18n();
const events = ref();
const instance = getCurrentInstance();
const card = ref(false);
const cardEvents = ref(false);
const selectDate = ref();
const eventsDay = ref();
function onClickHeadDay(item: CalendarItem) {
  const { date, time } = item.scope.timestamp;
  selectDate.value = date + " " + time;
  card.value = true;
}

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
  if (scheduleRoomLoad.length > 0) {
    scheduleRoomLoad.forEach((event) => {
      event.initialTime = new Date(event.initialTime);
      event.finalTime = new Date(event.finalTime);
      event.finalDate = formatDate(event.finalTime);
      event.colorRoom = insertColor(event.location);
    });
    events.value = scheduleRoomLoad;
  }
}
const onClickDay = (data: CalendarItem) => {
  const { date, time } = data.scope.timestamp;
  events.value.forEach((event: Event) => {
    eventsDay.value = events.value.filter(
      (event: EventRoom) => event.finalDate === date,
    );
  });
  if (eventsDay.value.length) {
    eventStorage.dataFull = date.toString();
    cardEvents.value = true;
    return eventsDay;
  }
  return negativeNotify(t("userScheduleRoom.thereAreNoEvents"));
};
watchEffect(() => {
  if (eventStorage.closeModal) {
    negativeNotify(t(`text.noMoreEvents`));
    cardEvents.value = false;
    return eventStorage.toggleCloseModal;
  }
});

function getHeadDay(item: CalendarTimeStamp) {
  const daysOfWeek = [
    t("userScheduleRoom.monday"),
    t("userScheduleRoom.tuesday"),
    t("userScheduleRoom.wednesday"),
    t("userScheduleRoom.thursday"),
    t("userScheduleRoom.friday"),
    t("userScheduleRoom.saturday"),
    t("userScheduleRoom.sunday"),
  ];
  const { date } = item;
  const data = new Date(date);
  return daysOfWeek[data.getDay()];
}
onMounted(() => {
  loadSchedule();
});
</script>
<style scoped>
.padding-top {
  position: relative;
  padding-top: 5vh;
}
.custom-color {
  background-color: rgb(31, 73, 125);
}
.my-card {
  top: 4vh;
}
.calendar-size {
  width: 100vh;
}
.font-custom {
  font-family: Fira Sans;
}
.spacing-header {
  margin-inline: 35rem;
}
</style>
