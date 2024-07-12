<template>
  <q-toolbar class="row justify-center">
    <q-item class="font-custom custom-margin">
      <q-item-section class="items-center">
        <q-btn
          no-caps
          color="green"
          :label="$t('text.schedulEvent')"
          class="text-body1 text-white"
          @click="openModalAddScheduleRoom"
        />
        <p class="text-green-8">
          {{ $t("text.selectDayForRoom") }}
          <q-icon
            name="help"
            color="indigo-8"
            size="2rem"
            class="cursor-pointer"
            @click="openVideo"
          />
          <q-dialog v-model="modalVideo">
            <div class="my-card relative-position no-scroll">
              <q-card class="no-scroll" flat>
                <DialogHeader
                  @close="(item) => (modalVideo = item)"
                  :option="$t('text.helpScheduleRoom')"
                />
                <VideoHelpForScheduleRoom />
              </q-card>
            </div>
          </q-dialog>
        </p>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="items-center">
        <Month :select-date="selectedDate" />
        <NavigationScheduleRoom
          @today="onToday"
          @prev="onPrev"
          @next="onNext"
        />
      </q-item-section>
    </q-item>
  </q-toolbar>
  <q-dialog v-model="card">
    <div class="my-card relative-position no-scroll">
      <q-card class="no-scroll" flat>
        <DialogHeader
          @close="(item) => (card = item)"
          :option="$t('text.organizerEvent')"
        />
        <AddScheduleRoom @reload="reloadModalAddScheduleRoom" />
      </q-card>
    </div>
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
    <div class="text-h5 calendar-size text-uppercase">
      <q-calendar-month
        ref="calendar"
        v-model="selectedDate"
        locale="pt-br"
        :day-min-height="100"
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
  <<<<<<< HEAD
  <div class="q-py-sm">
    <ButtonOptsRooms @opt-delete="deleteRooms = !deleteRooms" />
  </div>
  ======= >>>>>>> develop
  <div class="row justify-center font-custom">
    <div v-for="item in rooms" class="col-auto q-pa-md">
      <div class="row items-center">
        <q-badge
          rounded
          :style="`background-color:${item.color}`"
          class="q-mx-sm"
        />
        <span class="text-body1 text-black">{{ item.name }}</span>
        <q-icon
          color="red"
          size="sm"
          name="delete"
          v-if="deleteRooms"
          clicklable
          @click="delRoom(item.id)"
        />
      </div>
    </div>
  </div>
  <ButtonOptsRooms @reloadRoom="carregarSalas()" v-if="userStroage.getToken" />
</template>

<script setup lang="ts">
import { QCalendarMonth, today } from "@quasar/quasar-ui-qcalendar/";
import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass";
import { createEvent } from "./lib";
import { DateTime } from "luxon";
import {
  CalendarItem,
  CalendarTimeStamp,
  EventRoom,
} from "../../../entities/scheduleRoom";
import ScheduleRoomLoad from "../../../graphql/scheduleRoom/ScheduleRoomLoad.gql";
import LoadRooms from "../../../graphql/rooms/LoadRooms.gql";
import DeleteRoom from "../../../graphql/rooms/DeleteRoom.gql";
import { useEvents } from "../../../stores/events";
import { useUsers } from "../../../stores/user";

const deleteRooms = ref(false);
const userStroage = useUsers();
const eventStorage = useEvents();
const selectedDate = ref(today());
const dateNow = today();
const { t } = useI18n();
const events = ref();
const instance = getCurrentInstance();
const card = ref(false);
const cardEvents = ref(false);
const eventsDay = ref();
const modalVideo = ref(false);
const rooms = ref();

function onClickHeadDay(item: CalendarItem) {
  const { date, time } = item.scope.timestamp;
  eventStorage.setDateSelected(date + " " + time);
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

const openVideo = () => {
  modalVideo.value = true;
};

const openModalAddScheduleRoom = () => {
  card.value = true;
  eventStorage.resetDateSelected();
};

const reloadModalAddScheduleRoom = () => {
  card.value = false;
  loadSchedule();
};

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

watchEffect(() => {
  if (eventStorage.closeModal) {
    closeCardEvents();
    return eventStorage.toggleCloseModal;
  }
});

async function closeCardEvents() {
  cardEvents.value = false;
  await loadSchedule();
  negativeNotify(t(`text.noMoreEvents`));
}

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

async function carregarSalas() {
  const { loadRooms }: { loadRooms: Object } = await runQuery(LoadRooms);
  rooms.value = loadRooms;
}

async function delRoom(id: number) {
  const { deleteRoom }: { deleteRoom: boolean } = await runMutation(
    DeleteRoom,
    { roomId: id, date: dateNow },
  );
  if (deleteRoom) {
    carregarSalas();
    return loadSchedule();
  }
  negativeNotify(t("errors.existsMeets"));
}

onMounted(() => {
  loadSchedule();
  carregarSalas();
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
.custom-margin {
  margin-right: 15rem;
}
</style>
