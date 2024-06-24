import { InputSystem } from "../../../entities/system";

export const icons = [
  "home",
  "menu",
  "cancel",
  "login",
  "close",
  "block",
  "remove",
];
export function verifyInputsSystems(system: InputSystem) {
  for (const key in system) {
    if (Object.prototype.hasOwnProperty.call(system, key)) {
      const value = system[key as keyof InputSystem];
      if (!value) {
        return false;
      }
    }
  }
  return true;
}
