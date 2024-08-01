<template>
  <Separator :texto="$t('tab.scheduler')" />
  <ToolbarCalendar
    :date="selectedDate"
    @today="onToday"
    @prev="onPrev"
    @next="onNext"
    @openModalAdd="openModalAddScheduleRoom"
    :viewMode="viewMode"
  />
  <AddScheduleRoom
    @reload="reloadModalAddScheduleRoom"
    :card="card"
    @close="card = false"
  />
  <CardOfEvents
    :daysEvents="eventsDay"
    @reloadEvent="loadSchedule()"
    @close="closeCardEvents()"
    @editSuccess="loadSchedule()"
    :cardEvents="cardEvents"
    @closeCardEvents="cardEvents = false"
  />
  <div class="row justify-center font-custom">
    <div class="q-px-sm">
      <ButtonGoScheduleYear @change-schedule="(val) => (viewMode = val)" />
    </div>
    <div class="text-h5 calendar-size text-uppercase">
      <q-slide-transition>
        <q-calendar-month
          ref="calendar"
          v-if="viewMode === TIME_MAKER.MONTH"
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
        <CardGridMonths
          v-if="viewMode === TIME_MAKER.YEAR"
          @envity-month="goToSpecificMonth"
          :year="selectedDate"
          :reloadCard="reloadCardGridMonths"
          @reloadDesactive="reloadCardGridMonths = false"
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
import { DateTime } from "luxon";
import { createEvent, getHeadDay } from "../../Schedule/ScheduleRoom/lib";
import { CalendarItem, EventRoom } from "../../../entities/scheduleRoom";
import { TIME_MAKER, MIN_DAY_HEIGHT } from "../../../support/constants";

const instance = getCurrentInstance();
const eventStorage = useEvents();
const selectedDate = ref<string>(today());
const { t } = useI18n();
const card = ref(false);
const cardEvents = ref(false);
const rooms = ref();
const viewMode = ref(TIME_MAKER.MONTH);
const eventsDay = ref();
const events = ref();
const reloadCardGridMonths = ref();

watchEffect(() => {
  if (eventStorage.closeModal) {
    warningNotify(t(`text.noMoreEvents`));
    return eventStorage.toggleCloseModal;
  }
});

function closeCardEvents() {
  cardEvents.value = false;
  loadSchedule();
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
  warningNotify(t(`text.noMoreEvents`));
};

function onToday() {
  if (viewMode.value == TIME_MAKER.YEAR) {
    return goToSpecificYear("=");
  }
  if (instance && instance.refs && instance.refs.calendar) {
    (instance.refs.calendar as QCalendarMonth).moveToToday();
  }
}

function onPrev() {
  if (viewMode.value == TIME_MAKER.YEAR) {
    return goToSpecificYear("-");
  }
  if (instance && instance.refs && instance.refs.calendar) {
    (instance.refs.calendar as QCalendarMonth).prev();
  }
}

function onNext() {
  if (viewMode.value == TIME_MAKER.YEAR) {
    return goToSpecificYear("+");
  }
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
  reloadCardGridMonths.value = true;
  await loadSchedule();
};
onMounted(() => {
  loadSchedule();
});
async function goToSpecificMonth(targetYear: number, targetMonth: number) {
  viewMode.value = TIME_MAKER.MONTH;
  await nextTick();
  if (selectedDate) {
    const targetDate = `${targetYear}-${String(targetMonth).padStart(2, "0")}-01`;
    selectedDate.value = targetDate;
    await nextTick();
  }
}
async function goToSpecificYear(opt: string) {
  viewMode.value = TIME_MAKER.YEAR;
  await nextTick();
  if (selectedDate.value) {
    const currentDate = DateTime.fromISO(selectedDate.value);
    let targetYear = currentDate.year;
    if (opt === "+") {
      targetYear += 1;
    }
    if (opt === "-") {
      targetYear -= 1;
    }
    if (opt === "=") {
      targetYear = DateTime.now().year;
    }
    const targetDate = DateTime.fromObject({
      year: targetYear,
      month: 1,
      day: 1,
    }).toISODate();
    selectedDate.value = targetDate as string;
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
