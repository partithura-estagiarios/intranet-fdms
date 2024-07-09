import { DateTime } from "luxon";

export const formatDate = (dateTime: string) => {
  const dt = DateTime.fromISO(dateTime, { zone: "utc" });
  const year = dt.year.toString().padStart(4, "0");
  const month = dt.month.toString().padStart(2, "0");
  const day = dt.day.toString().padStart(2, "0");
  const hour = dt.hour.toString().padStart(2, "0");
  const minute = dt.minute.toString().padStart(2, "0");
  const formattedDateTime = `${day}/${month}/${year} ${hour}:${minute}`;
  return formattedDateTime;
};
