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

export function getHours(date: Date): string {
  return (
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0")
  );
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
