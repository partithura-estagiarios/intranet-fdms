import { defineStore } from "pinia";
import { EventRoom } from "../entities/scheduleRoom";
import LoadAllEventsInMonth from "../graphql/scheduleRoom/LoadAllEventsInMonth.gql";
export const monthsAux = [
  { label: "january", numberMonth: 1 },
  { label: "february", numberMonth: 2 },
  { label: "march", numberMonth: 3 },
  { label: "april", numberMonth: 4 },
  { label: "may", numberMonth: 5 },
  { label: "june", numberMonth: 6 },
  { label: "july", numberMonth: 7 },
  { label: "august", numberMonth: 8 },
  { label: "september", numberMonth: 9 },
  { label: "october", numberMonth: 10 },
  { label: "november", numberMonth: 11 },
  { label: "december", numberMonth: 12 },
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
  numberMonth: number;
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
    loadEvents: async (months: AuxMonth[], year: number) => {
      const monthsStorage = useMonths();
      monthsStorage.months = [];
      const promises = months.map(async (mes: AuxMonth) => {
        const { loadAllEventsInMonth }: { loadAllEventsInMonth: EventRoom[] } =
          await runQuery(LoadAllEventsInMonth, {
            month: mes.label,
            yearSelect: year,
          });
        return {
          name: mes.label,
          events: loadAllEventsInMonth,
          value: mes.numberMonth,
        };
      });
      const monthsData = await Promise.all(promises);
      monthsStorage.months = monthsData.sort((a, b) => a.value - b.value);
    },
    previousMonth: async (monthName: string) => {
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
