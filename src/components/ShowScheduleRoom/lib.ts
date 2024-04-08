import { DateTime } from "luxon";
export function getHoursMinutes(event: string) {
  const dateTime = DateTime.fromISO(event);
  const formattedTime = dateTime.toFormat("HH:mm");
  return formattedTime;
}
