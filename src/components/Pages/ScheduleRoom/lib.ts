import { event } from "quasar";

export const countryCodes = {
  BR: "pt-BR", // 'Brasil', Portuguese Brazil
  US: "en-US", // 'United States of America', English USA
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
export function insertColor(room: String) {
  switch (room) {
    case "SALA A":
      return "red";
      break;
  }
  switch (room) {
    case "SALA B":
      return "green";
      break;
  }
  switch (room) {
    case "SALA C":
      return "yellow";
      break;
  }
  switch (room) {
    case "SALA DE REUNIÃO":
      return "orange";
      break;
  }
}
export const rooms = [
  { name: "SALA_A", color: "red" },
  { name: "SALA_B", color: "green" },
  { name: "SALA_C", color: "yellow" },
  { name: "SALA_DE_REUNIÃO", color: "orange" },
];
