import { defineStore } from "pinia";
import { EventRoom } from "../entities/scheduleRoom";
import LoadAllEventsInMonth from "../graphql/scheduleRoom/LoadAllEventsInMonth.gql";
const id = "months";
export interface Month {
  name: string;
  events: EventRoom[];
}
export interface AuxMonth {
  label: string;
  value: number;
}

interface State {
  months: Month[];
}
export const useMonths = defineStore(id, {
  state: (): State => ({
    months: [],
  }),
  getters: {},
  actions: {
    loadEvents: async (months: AuxMonth[]) => {
      const monthsStorage = useMonths();
      monthsStorage.months = [];
      const promises = months.map(async (mes: AuxMonth) => {
        const { loadAllEventsInMonth }: { loadAllEventsInMonth: EventRoom[] } =
          await runQuery(LoadAllEventsInMonth, { month: mes.label });
        return {
          name: mes.label,
          events: loadAllEventsInMonth,
          value: mes.value,
        };
      });
      const monthsData = await Promise.all(promises);
      monthsStorage.months = monthsData.sort((a, b) => a.value - b.value);
    },
  },
});
