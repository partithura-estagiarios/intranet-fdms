<template>
  <div class="row justify-center">
    <NavigationScheduleRoom @select-month="(item) => (selectedDate = item)" />

    <Month :select-date="selectedDate" />
  </div>
  <div class="subcontent">
    <div class="row justify-center">
      <div class="calendarM">
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
            <template v-for="event in events" :key="event.id">
              <div class="my-event" v-if="event.final_date == timestamp.date">
                {{
                  (event.description.rules,
                  "-",
                  event.initial_time,
                  event.final_time)
                }}
                <q-tooltip>{{ event.support }}</q-tooltip>
              </div>
            </template>
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

import GetScheduleRoomQuery from "../../../graphql/scheduleRoom/getScheduleRoom.gql";
import { item } from "../../TabHeader/ButtonDropdownSettings/lib";
onMounted(async () => {
  const { getScheduleRoom } = await runQuery(GetScheduleRoomQuery);
  if (getScheduleRoom.length > 0) {
    getScheduleRoom.forEach((event) => {
      event.initial_time = new Date(event.initial_time);
      event.final_time = new Date(event.final_time);
      event.final_date = getFormattedDate(event.final_time);
    });
    events.value = getScheduleRoom;
  }
});

function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const selectedDate = ref(today());

const events = ref();
</script>

<style scoped>
.calendarM {
  display: flex;
  max-width: 800px;
  width: 100%;
}
.my-event {
  position: relative;
  font-size: 12px;
  width: 100%;
  margin: 1px 0 0 0;
  justify-content: center;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}
.title {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.text-white {
  color: white;
}
.bg-blue {
  background: blue;
}
.bg-green {
  background: green;
}
.bg-orange {
  background: orange;
}
.bg-red {
  background: red;
}
.bg-teal {
  background: teal;
}
.bg-grey {
  background: grey;
}
.bg-purple {
  background: purple;
}
.rounded-border {
  border-radius: 2px;
}
</style>
