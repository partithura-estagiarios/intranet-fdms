import { SystemList } from "../../../entities/system";

export const icons = [
  "home",
  "menu",
  "cancel",
  "login",
  "close",
  "block",
  "remove",
];
export function verifyInputsSystems(system: SystemList) {
  for (const key in system) {
    if (Object.prototype.hasOwnProperty.call(system, key)) {
      const value = system[key as keyof SystemList];
      if (!value) {
        return false;
      }
    }
  }
  return true;
}
