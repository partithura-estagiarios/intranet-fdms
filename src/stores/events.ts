import { defineStore } from "pinia";
import LoadEventsInData from "../graphql/scheduleRoom/LoadEventsInData.gql";
import NextEvents from "../graphql/scheduleRoom/NextEvents.gql";

import { DateTime } from "luxon";

import { EventRoom } from "../entities/scheduleRoom";
const id = "events";

export const useEvents = defineStore(id, {
  state: () => ({
    dataFull: "",
    closeModal: false,
    dateSelected: "",
    dateRepeat: false,
  }),
  getters: {
    getFullData(state) {
      const date = DateTime.fromISO(state.dataFull, { locale: "pt-BR" });
      const month = date.toFormat("LLLL");
      const weekDay = date.toFormat("cccc");
      const day = date.toFormat("d");
      const formatedWeekDay = weekDay.replace("-feira", "");
      const formattedDate = {
        weekDay: formatedWeekDay,
        day: day,
        month: month,
      };
      return formattedDate;
    },
    getCloseModal(state) {
      return state.closeModal;
    },
    toggleCloseModal(state) {
      return (state.closeModal = !state.closeModal);
    },
    getDateSelected(state) {
      return state.dateSelected;
    },
    getRepeatDate(state) {
      return state.dateRepeat;
    },
  },
  actions: {
    nextData: async (number: Number) => {
      const eventStorage = useEvents();
      const { nextEvents }: { nextEvents: string } = await runQuery(
        NextEvents,
        {
          date: eventStorage.dataFull,
          nextOrOld: number,
        },
      );
      const dateTime1 = DateTime.fromISO(nextEvents, { zone: "utc" });
      const currentDateTime = DateTime.fromISO(eventStorage.dataFull);

      if (dateTime1.toISODate() === currentDateTime.toISODate()) {
        return eventStorage.toggleCloseModal;
      }
      const dateTime = DateTime.fromISO(nextEvents, { zone: "utc" });
      if (
        dateTime.hour === 0 &&
        dateTime.minute === 0 &&
        dateTime.second === 0 &&
        dateTime.millisecond === 0
      ) {
        const adjustedDateTime = dateTime.plus({ hours: 3 });
        const formattedDate = adjustedDateTime.toFormat("yyyy-MM-dd");
        return (eventStorage.dataFull = formattedDate);
      }
      const formattedDate = dateTime.toFormat("yyyy-MM-dd");

      return (eventStorage.dataFull = formattedDate);
    },
    loadEvents: async () => {
      const eventStorage = useEvents();
      const { loadEventsInData }: { loadEventsInData: EventRoom[] } =
        await runQuery(LoadEventsInData, { date: eventStorage.dataFull });
      return loadEventsInData;
    },
    setDateSelected(date: string) {
      const selectedDate = new Date(date);
      const eventStorage = useEvents();
      eventStorage.dateSelected = selectedDate.toISOString().split("T")[0];
      eventStorage.dateSelected = eventStorage.dateSelected.replace(/-/g, "/");
    },
    resetDateSelected() {
      const eventStorage = useEvents();
      return (eventStorage.dateSelected = "");
    },
    isRepeat() {
      const eventStorage = useEvents();
      eventStorage.dateRepeat = !eventStorage.dateRepeat;
    },
  },
});
