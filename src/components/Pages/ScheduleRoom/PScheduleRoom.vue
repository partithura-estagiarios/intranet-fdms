<template>
  <div class="fit row padding-top justify-evenly">
    <Month :select-date="selectedDate" />
    <!-- <NavigationScheduleRoom @today="onToday" @prev="onPrev" @next="onNext" /> -->

    <q-btn
      color="green"
      :label="$t('text.schedulEvent')"
      class="row font-custom rounded-borders"
      no-caps
      size="1.2rem"
      @click="(card = true), (selectDate = '')"
    />

    <!-- <div class="q-px-md q-pa-md text-green-8">
      {{ $t("text.selectDayForRoom") }}
    </div> -->
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
  <div class="q-pa-md row justify-center">
    <div class="text-h5 calendar-size text-uppercase">
      <q-calendar-month
        ref="calendar"
        v-model="selectedDate"
        animated
        bordered
        focusable
        locale="pt-br"
        hoverable
        short-weekday-label
        :day-min-height="100"
        @click-date="onClickHeadDay"
      >
        <template #day="{ scope: { timestamp } }">
          {{ console.log(timestamp) }}

          <ExpansionEvent :data="timestamp.date" :events="events" />
        </template>
      </q-calendar-month>
    </div>
  </div>
  <!-- <div class="row justify-center">
    <div v-for="(item, index) in rooms" class="col-auto q-pa-md" :key="index">
      <div class="row items-center">
        <q-badge rounded :color="item.color" class="mr-2" />
        <span>{{ $t(`text.${item.name}`) }}</span>
      </div>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { QCalendarMonth, today } from "@quasar/quasar-ui-qcalendar/";
import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass";
import { formatDate, insertColor, rooms } from "./lib";
import { CalendarItem, Event } from "../../../entities/scheduleRoom";
import ScheduleRoomLoad from "../../../graphql/scheduleRoom/queries.gql";
const selectedDate = ref(today());
const events = ref();
const instance = getCurrentInstance();
const card = ref(false);
const selectDate = ref();
const options = ref();
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
    scheduleRoomLoad: Event[];
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
onMounted(() => {
  loadSchedule();
});
</script>
<style scoped>
.padding-top {
  position: relative;
  padding-top: 10vh;
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
</style>
