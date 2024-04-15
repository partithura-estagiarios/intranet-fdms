import { DateTime } from "luxon";
import { SuPMaterials } from "../../entities/supportMaterials";
export function formatDateTime(dateTime: Date) {
  return DateTime.fromJSDate(dateTime).toFormat("HH:mm");
}
enum ValidKeys {
  projector = "projector",
  water = "water",
  flipSharp = "flipSharp",
  equipamentSong = "equipamentSong",
  coffee = "coffee",
  computer = "computer",
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
    if (translations[validKey]) {
      materialsSup[validKey] = translations[validKey];
    }
  });

  return materialsSup;
}
