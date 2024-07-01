import lodash from "lodash";
import { InputsForScheduleRoom } from "../../../entities/scheduleRoom";
import { DateTime } from "luxon";
export const inputsForScheduleRoom = {
  inputs: {
    name: { value: "", icon: "person" },
    userRegistration: { value: null, icon: "badge" },
    ramal: { value: null, icon: "call" },
    email: { value: "", icon: "email" },
    totalPeople: { value: null, icon: "groups" },
  },
  options: {
    rooms: ["SALA A", "SALA B", "SALA C", "SALA DE REUNIÃO"],
    icon: "share_location",
    value: "",
  },
  dateInfos: {
    initialTime: { value: null, icon: "event" },
    finalTime: { value: null, icon: "event" },
  },
  inputsLongs: {
    supportMaterialExtras: "",
    description: "",
  },
  booleanInfos: {
    computer: { value: false, icon: "computer" },
    projector: { value: false, icon: "switch_video" },
    water: { value: false, icon: "water_drop" },
    coffee: { value: false, icon: "local_cafe" },
    flipSharp: { value: false, icon: "filter_frames" },
    equipamentSong: { value: false, icon: "surround_sound" },
  },
};

export function resetObject(obj: any) {
  lodash.forEach(obj, (value, key) => {
    if (lodash.isObject(value) && !lodash.isArray(value)) {
      resetObject(value);
    }
    if (key === "value") {
      obj[key] = lodash.isBoolean(value)
        ? false
        : lodash.isString(value)
          ? ""
          : value;
    }
    if (key === "description" || key === "supportMaterialExtras") {
      obj[key] = "";
    }
  });
  return obj;
}

export function adaptScheduleToRoom(schedule: InputsForScheduleRoom) {
  const adaptedSchedule = {
    host: {
      name: schedule.inputs.name.value,
      ramalNumber: schedule.inputs.ramal.value,
      userRegistration: schedule.inputs.userRegistration.value,
      email: schedule.inputs.email.value,
      totalPeople: schedule.inputs.totalPeople.value,
    },
    location: schedule.options.value,
    description: schedule.inputsLongs.description,
    initialTime: convertDateTimeTo0300Z(schedule.dateInfos.initialTime.value),
    finalTime: convertDateTimeTo0300Z(schedule.dateInfos.finalTime.value),
    support: {
      computer: schedule.booleanInfos.computer.value,
      projector: schedule.booleanInfos.projector.value,
      water: schedule.booleanInfos.water.value,
      coffee: schedule.booleanInfos.coffee.value,
      flipSharp: schedule.booleanInfos.flipSharp.value,
      equipamentSong: schedule.booleanInfos.equipamentSong.value,
      helpers: schedule.inputsLongs.supportMaterialExtras,
    },
  };
  return adaptedSchedule;
}
function convertDateTimeTo0300Z(dateTimeString: DateTime) {
  const auxDate = dateTimeString.toString();
  const [datePart, timePart] = auxDate.split(" ");
  const [year, month, day] = datePart.split("/");
  const [hour, minute] = timePart.split(":");
  const dt = DateTime.fromObject({
    year: parseInt(year),
    month: parseInt(month),
    day: parseInt(day),
    hour: parseInt(hour),
    minute: parseInt(minute),
  }).setZone("utc-3");
  const formattedDate = dt.toFormat("yyyy-MM-dd'T'HH:mm:ss.0300'Z'");
  return formattedDate;
}

export function fieldsValid(schedule: InputsForScheduleRoom, option: string) {
  if (!validInputsNormals(schedule, option)) {
    return false;
  }
  if (!validDateInput(schedule)) {
    return false;
  }
  return true;
}

export function validInputsNormals(
  schedule: InputsForScheduleRoom,
  option: string,
) {
  if (
    !schedule.inputs ||
    !schedule.options.value ||
    !schedule.inputsLongs.description ||
    !option
  ) {
    return false;
  }
  const properties = Object.values(schedule.inputs);
  return properties.every((property) => {
    return property.value !== null && property.value !== "";
  });
}

export function validDateInput(schedule: InputsForScheduleRoom) {
  if (!schedule.dateInfos) {
    return false;
  }
  const properties = Object.values(schedule.dateInfos);
  return properties.every((property) => {
    return property.value !== undefined;
  });
}
