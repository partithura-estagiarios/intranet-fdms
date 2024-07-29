import { defineStore } from "pinia";
import { EventRoom } from "../entities/scheduleRoom";
import LoadAllEventsInMonth from "../graphql/scheduleRoom/LoadAllEventsInMonth.gql";
export const monthsAux = [
  { label: "january", value: 1 },
  { label: "february", value: 2 },
  { label: "march", value: 3 },
  { label: "april", value: 4 },
  { label: "may", value: 5 },
  { label: "june", value: 6 },
  { label: "july", value: 7 },
  { label: "august", value: 8 },
  { label: "september", value: 9 },
  { label: "october", value: 10 },
  { label: "november", value: 11 },
  { label: "december", value: 12 },
];

function getPreviousMonth(monthName: string): string {
  const currentMonthIndex = monthsAux.findIndex(
    (month) => month.label === monthName,
  );
  const newMonthIndex =
    (currentMonthIndex - 1 + monthsAux.length) % monthsAux.length;

  return monthsAux[newMonthIndex].label;
}
function getNextMonth(monthName: string): string {
  const currentMonthIndex = monthsAux.findIndex(
    (month) => month.label === monthName,
  );
  const newMonthIndex = (currentMonthIndex + 1) % monthsAux.length;

  return monthsAux[newMonthIndex].label;
}

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
    previousMonth: async (monthName: string) => {
      const monthsStorage = useMonths();
      const { loadAllEventsInMonth }: { loadAllEventsInMonth: EventRoom[] } =
        await runQuery(LoadAllEventsInMonth, {
          month: getPreviousMonth(monthName),
        });
      return {
        name: getPreviousMonth(monthName),
        events: loadAllEventsInMonth,
      };
    },
    nextMonth: async (monthName: string) => {
      const monthsStorage = useMonths();
      const { loadAllEventsInMonth }: { loadAllEventsInMonth: EventRoom[] } =
        await runQuery(LoadAllEventsInMonth, {
          month: getNextMonth(monthName),
        });
      return {
        name: getNextMonth(monthName),
        events: loadAllEventsInMonth,
      };
    },
  },
});
