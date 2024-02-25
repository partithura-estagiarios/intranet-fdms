import { Notify } from "quasar";

function notify(
  message: string,
  color: string,
  icon: string,
  timeout: number
): void {
  Notify.create({
    message,
    timeout,
    color,
    icon,
  });
}
export function positiveNotify(
  message: string,
  color = "positive",
  icon = "check",
  timeout = 3000
): void {
  notify(message, color, icon, timeout);
}

export function negativeNotify(
  message: string,
  color = "negative",
  icon = "error",
  timeout = 3000
): void {
  notify(message, color, icon, timeout);
}

export function infoNotify(
  message: string,
  color = "blue",
  icon = "info",
  timeout = 10000
): void {
  notify(message, color, icon, timeout);
}
