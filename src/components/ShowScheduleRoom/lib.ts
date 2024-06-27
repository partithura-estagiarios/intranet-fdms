import { DateTime } from "luxon";
import { SuPMaterials } from "../../entities/supportMaterials";
import { ValidKeys } from "../../support/contracts";
export function getHours(date: string) {
  const dataObj = DateTime.fromISO(date, { zone: "utc-3" });
  const hora = dataObj.toFormat("HH:mm");
  return hora;
}

export function renameKeys(materialsSup: SuPMaterials) {
  const translations: Record<ValidKeys, string> = {
    projector: "videocam",
    water: "water_drop",
    flipSharp: "filter_frames",
    equipamentSong: "surround_sound",
    coffee: "coffee",
    computer: "computer",
  };

  Object.keys(materialsSup).forEach((key) => {
    const validKey = key as ValidKeys;
    if (translations[validKey] && materialsSup[validKey] === true) {
      materialsSup[validKey] = translations[validKey];
    }
  });

  return materialsSup;
}
