import { defineStore } from "pinia";
import LoadEventsInData from "../graphql/scheduleRoom/LoadEventsInData.gql";
import { DateTime } from "luxon";
const id = "events";

export const useEvents = defineStore(id, {
  state: () => ({
    dataFull: "",
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
  },
  actions: {
    nextData() {
      const eventStorage = useEvents();
      const currentDate = new Date(eventStorage.dataFull);
      currentDate.setDate(currentDate.getDate() + 1);
      const nextDate = currentDate.toISOString().split("T")[0];
      return (eventStorage.dataFull = nextDate);
    },
    oldData() {
      const eventStorage = useEvents();
      const currentDate = new Date(eventStorage.dataFull);
      currentDate.setDate(currentDate.getDate() - 1);
      const oldData = currentDate.toISOString().split("T")[0];
      return (eventStorage.dataFull = oldData);
    },
    loadEvents: async () => {
      const eventStorage = useEvents();
      const { loadEventsInData }: { loadEventsInData: object } = await runQuery(
        LoadEventsInData,
        { data: eventStorage.dataFull },
      );
      return loadEventsInData;
    },
  },
});
