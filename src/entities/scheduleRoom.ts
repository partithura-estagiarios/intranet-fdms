import { DateTime } from "luxon";

export interface EventRoom {
  id: string;
  host: {
    name: string;
    ramalNumber: string;
    userRegistration: string;
    email: string;
  };
  location: string;
  rules: string;
  totalPeoples: string;
  initialTime: DateTime;
  finalTime: DateTime;
  support: {
    computer: boolean;
    projector: boolean;
    water: boolean;
    coffee: boolean;
    flipSharp: null;
    equipamentSong: null;
    helpers: null;
  };
  finalDate: string;
  colorRoom: string;
}
export interface CalendarItem {
  scope: {
    timestamp: {
      date: String;
      time: String;
    };
  };
}
export interface CalendarTimeStamp {
  date: string;
}
interface Inputs {
  name: {
    value: string;
    icon: string;
  };
  userRegistration: {
    value: string | null;
    icon: string;
  };
  ramal: {
    value: string | null;
    icon: string;
  };
  email: {
    value: string;
    icon: string;
  };
  totalPeople: {
    value: number | null;
    icon: string;
  };
}

interface Options {
  rooms: string[];
  icon: string;
  value: string;
}

interface DateInfos {
  initialTime: {
    icon: string;
    value: DateTime;
  };
  finalTime: {
    icon: string;
    value: DateTime;
  };
}

export interface EditEventInterface {
  id: number;
  totalPeoples: number;
  location: string;
  initialTime: DateTime;
  finalTime: DateTime;
  support: {
    computer: boolean;
    projector: boolean;
    water: boolean;
    coffee: boolean;
    flipSharp: boolean;
    equipamentSong: boolean;
    helpers: null;
  };
}

interface InputsLongs {
  supportMaterialExtras: string;
  description: string;
}

interface BooleanInfos {
  [key: string]: {
    value: boolean;
    icon: string;
  };
}

export interface InputsForScheduleRoom {
  inputs: Inputs;
  options: Options;
  dateInfos: DateInfos;
  inputsLongs: InputsLongs;
  booleanInfos: BooleanInfos;
}
