<template>
  <div
    class="fit column wrap justify-center items-center content-center padding-top"
  >
    <Month :select-date="selectedDate" />
    <NavigationScheduleRoom @today="onToday" @prev="onPrev" @next="onNext" />
    <div class="row">
      <div v-for="(item, index) in rooms" class="col-auto q-pa-md" :key="index">
        <div class="row items-center">
          <q-badge rounded :color="item.color" class="mr-2" />
          <span>{{ $t(`text.${item.name}`) }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="row q-px-md q-pa-sm">
    <q-btn
      color="green"
      text-color="white"
      :label="$t('text.addRoom')"
      class="row"
      @click="(card = true), (selectDate = '')"
    />
    <div class="q-px-md q-pa-md">
      {{ $t("text.selectDayForRoom") }}
    </div>
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
  <div class="subcontent">
    <div class="row justify-center">
      <div class="calendarM row window-width">
        <q-calendar-month
          ref="calendar"
          v-model="selectedDate"
          animated
          bordered
          focusable
          locale="pt-br"
          hoverable
          :day-min-height="60"
          :day-height="0"
          @click-date="onClickHeadDay"
        >
          <template #day="{ scope: { timestamp } }">
            <ExpansionEvent :data="timestamp.date" :events="events" />
          </template>
        </q-calendar-month>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QCalendarMonth, today } from "@quasar/quasar-ui-qcalendar/";
import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass";
import * as ScheduleRoomQuery from "../../../graphql/scheduleRoom/queries.gql";
import { formatDate, insertColor, rooms } from "./lib";
const selectedDate = ref(today());
const events = ref();
const instance = getCurrentInstance();
const card = ref(false);
const selectDate = ref();
function onClickHeadDay(item) {
  const { date, time } = item.scope.timestamp;
  selectDate.value = date + " " + time;
  card.value = true;
}
function onToday() {
  instance.refs.calendar.moveToToday();
}

function onPrev() {
  instance.refs.calendar.prev();
}

function onNext() {
  instance.refs.calendar.next();
}
async function loadSchedule() {
  const { loadScheduleRoom } = await runQuery(
    ScheduleRoomQuery.LoadScheduleRoom,
  );
  if (loadScheduleRoom.length > 0) {
    loadScheduleRoom.forEach((event) => {
      event.initialTime = new Date(event.initialTime);
      event.finalTime = new Date(event.finalTime);
      event.finalDate = formatDate(event.finalTime);
      event.colorRoom = insertColor(event.location);
    });
    events.value = loadScheduleRoom;
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
</style>
