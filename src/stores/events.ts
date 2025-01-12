import { defineStore } from "pinia";
import LoadEventsInData from "../graphql/scheduleRoom/LoadEventsInData.gql";
import GetPreviousAndNext from "../graphql/scheduleRoom/GetPreviousAndNext.gql";

import { DateTime } from "luxon";

import { EventRoom } from "../entities/scheduleRoom";
const id = "events";
interface NextAndOldDate {
  nextDate: string;
  oldDate: string;
}
export const useEvents = defineStore(id, {
  state: () => ({
    dataFull: "",
    closeModal: false,
    dateSelected: "",
    dateRepeat: false,
    dateNext: "",
    dateOld: "",
    isSameDate: false,
    loading: false,
    loadingCardEdit: false,
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
    toogleReload(state) {
      return (state.loading = !state.loading);
    },
    toogleReloadCardEdit(state) {
      return (state.loadingCardEdit = !state.loadingCardEdit);
    },
  },
  actions: {
    loadEvents: async (date: string) => {
      const eventStorage = useEvents();
      eventStorage.dataFull = date;
      const { loadEventsInData }: { loadEventsInData: EventRoom[] } =
        await runQuery(LoadEventsInData, { date: date });
      const { getPreviousAndNext }: { getPreviousAndNext: NextAndOldDate } =
        await runQuery(GetPreviousAndNext, { date: date });
      eventStorage.dateOld = getPreviousAndNext.oldDate;
      eventStorage.dateNext = getPreviousAndNext.nextDate;
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
    isSameDate(dateInit: any, dateFinal: any) {
      const eventStorage = useEvents();
      const dateInitPart = dateInit.split(" ");
      const dateFinalPart = dateFinal.split(" ");
      if (dateInitPart[0] === dateFinalPart[0]) {
        return (eventStorage.dateRepeat = true);
      }

      return (eventStorage.dateRepeat = false);
    },
  },
});
