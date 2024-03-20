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
    equipament_song: { value: false, icon: "surround_sound" },
  },
};

export function verifyTypeOfInput(input) {
  if (input == null) {
    return "number";
  }
}

export function verifyReceivedDate(date) {
  if (date != "") {
    return date;
  }
  return false;
}
export function adaptScheduleToRoom(schedule) {
  return {
    userCreated: {
      name: schedule.inputs.name.value,
      ramalNumber: schedule.inputs.ramal.value,
      userRegistration: schedule.inputs.userRegistration.value,
      email: schedule.inputs.email.value,
      totalPeople: schedule.inputs.totalPeople.value,
    },
    location: schedule.options.value,
    description: schedule.inputsLongs.description,
    initialTime: schedule.dateInfos.initialTime.value,
    finalTime: schedule.dateInfos.finalTime.value,
    support: {
      computer: schedule.booleanInfos.computer.value,
      projector: schedule.booleanInfos.projector.value,
      water: schedule.booleanInfos.water.value,
      coffee: schedule.booleanInfos.coffee.value,
      flipSharp: schedule.booleanInfos.flipSharp.value,
      equipamentSong: schedule.booleanInfos.equipament_song.value,
      helpers: schedule.inputsLongs.supportMaterialExtras, // Não precisa acessar 'value' diretamente
    },
  };
}
