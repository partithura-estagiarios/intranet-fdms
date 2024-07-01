import { EventRoom } from "../../../entities/scheduleRoom";
import { DateTime } from "luxon";

export const countryCodes: { [key: string]: string } = {
  BR: "pt-BR",
  US: "en-US",
};
export const monthsAux = [
  { label: "label.monhs.january", value: 1 },
  { label: "label.monhs.february", value: 2 },
  { label: "label.monhs.march", value: 3 },
  { label: "label.monhs.april", value: 4 },
  { label: "label.monhs.may", value: 5 },
  { label: "label.monhs.june", value: 6 },
  { label: "label.monhs.july", value: 7 },
  { label: "label.monhs.augus", value: 8 },
  { label: "label.monhs.sepember", value: 9 },
  { label: "label.monhs.ocober", value: 10 },
  { label: "label.monhs.november", value: 11 },
  { label: "label.monhs.december", value: 12 },
];
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adiciona zero à esquerda se o mês for menor que 10
  const day = String(date.getDate()).padStart(2, "0"); // Adiciona zero à esquerda se o dia for menor que 10
  return `${year}-${month}-${day}`;
}
export function insertColor(room: string): string {
  switch (room) {
    case "SALA A":
      return "red";
    case "SALA B":
      return "green";
    case "SALA C":
      return "yellow";
    case "SALA DE REUNIÃO":
      return "orange";
    default:
      return "";
  }
}

export function getHours(date: DateTime) {
  const auxDate = date.toString();
  const dataObj = DateTime.fromISO(auxDate, { zone: "utc" });
  const hora = dataObj.toFormat("HH:mm");
  return hora;
}

export function getFullDate(data: EventRoom) {
  const date = DateTime.fromISO(data.finalDate, { locale: "pt-BR" });
  const dayOfWeekShort = date.toFormat("cccc");
  const dayOfMonth = date.toFormat("d");
  const month = date.toFormat("LLLL");
  const formattedDayOfWeek = dayOfWeekShort.replace("-feira", "");
  const formattedDate = {
    weekDay: formattedDayOfWeek,
    day: dayOfMonth,
    month: month,
  };

  return formattedDate;
}

export const rooms = [
  { name: "roomA", color: "red" },
  { name: "roomB", color: "green" },
  { name: "roomC", color: "yellow" },
  { name: "roomOfReunion", color: "orange" },
];

export function createEvent(events: any[]) {
  const eventsAux: any[] = [];

  events.forEach((element) => {
    if (
      element.initialTime.year === element.finalTime.year &&
      element.initialTime.month === element.finalTime.month &&
      element.initialTime.day === element.finalTime.day
    ) {
      const dailyEvent = {
        ...element,
        initialTime: element.initialTime.toISO({ includeOffset: true }),
        finalTime: element.finalTime.toISO({ includeOffset: true }),
      };
      return eventsAux.push(dailyEvent);
    }
    createEvents(element, eventsAux);
  });
  return eventsAux;
}

function createEvents(event: any, events: any[]) {
  const initialTime = DateTime.fromMillis(event.initialTime.ts);
  const finalTime = DateTime.fromMillis(event.finalTime.ts);
  let currentDate = initialTime.startOf("day");
  while (currentDate <= finalTime) {
    const endOfDay = currentDate
      .endOf("day")
      .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
      .setZone("utc-3");

    const isLastDay = currentDate.hasSame(finalTime, "day");

    const adjustedFinalTime = isLastDay ? finalTime : endOfDay;

    const dailyEvent = {
      ...event,
      initialTime: currentDate.toISO({ includeOffset: true }),
      finalTime: adjustedFinalTime.toISO({ includeOffset: true }),
    };
    events.push(dailyEvent);
    currentDate = currentDate.plus({ days: 1 }).startOf("day");
  }
}
