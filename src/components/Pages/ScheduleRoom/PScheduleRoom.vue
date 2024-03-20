<template>
  <div class="fit column wrap justify-center items-center content-center">
    <Month :select-date="selectedDate" />
    <NavigationScheduleRoom @today="onToday" @prev="onPrev" @next="onNext" />
    <div class="row">
      <div v-for="(item, index) in rooms" class="col-auto q-pa-md" :key="index">
        <div class="row items-center">
          <q-badge rounded :color="item.color" class="mr-2" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="subcontent">
    <div class="row justify-center">
      <div class="calendarM row window-width">
        <q-calendar-month
          ref="calendar"
          v-model="selectedDate"
          animated
          bordered
          focusable
          hoverable
          no-active-date
          :day-min-height="60"
          :day-height="0"
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
import * as Query from "../../../graphql/scheduleRoom/queries.gql";
import { formatDate, insertColor, rooms } from "./lib";

const selectedDate = ref(today());
const events = ref();
const instance = getCurrentInstance();

function onToday() {
  instance.refs.calendar.moveToToday();
}

function onPrev() {
  instance.refs.calendar.prev();
}

function onNext() {
  instance.refs.calendar.next();
}

onMounted(async () => {
  const { getScheduleRoom } = await runQuery(Query.GetScheduleRoom);
  if (getScheduleRoom.length > 0) {
    getScheduleRoom.forEach((event) => {
      event.initial_time = new Date(event.initial_time);
      event.final_time = new Date(event.final_time);
      event.final_date = formatDate(event.final_time);
      event.colorRoom = insertColor(event.location);
    });
    events.value = getScheduleRoom;
  }
});
</script>
