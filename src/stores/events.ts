import { defineStore } from "pinia";
import LoadEventsInData from "../graphql/scheduleRoom/LoadEventsInData.gql";
import NextEvents from "../graphql/scheduleRoom/NextEvents.gql";

import { DateTime } from "luxon";
import { set } from "zod";
import { stat } from "fs";
import { EventRoom } from "../entities/scheduleRoom";
const id = "events";

export const useEvents = defineStore(id, {
  state: () => ({
    dataFull: "",
    closeModal: false,
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
  },
  actions: {
    nextData: async (number: Number) => {
      const eventStorage = useEvents();
      const { nextEvents }: { nextEvents: string } = await runQuery(
        NextEvents,
        {
          data: eventStorage.dataFull,
          nextOrOld: number,
        },
      );

      if (eventStorage.dataFull == nextEvents) {
        return eventStorage.toggleCloseModal;
      }
      return (eventStorage.dataFull = nextEvents);
    },
    loadEvents: async () => {
      const eventStorage = useEvents();
      const { loadEventsInData }: { loadEventsInData: EventRoom[] } =
        await runQuery(LoadEventsInData, { data: eventStorage.dataFull });
      return loadEventsInData;
    },
  },
});
