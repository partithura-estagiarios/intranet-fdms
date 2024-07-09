import { DateTime } from "luxon";
export function getHours(date: string) {
  const dataObj = DateTime.fromISO(date, { zone: "utc-3" });
  const hora = dataObj.toFormat("HH:mm dd-MM");
  return hora;
}
