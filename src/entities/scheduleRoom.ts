export interface Event {
  id: string;
  userCreated: {
    name: string;
    ramalNumber: string;
    userRegistration: string;
    email: string;
  };
  location: string;
  rules: string;
  totalPeoples: string;
  initialTime: string | Date;
  finalTime: string | Date;
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
    value: string;
  };
  finalTime: {
    icon: string;
    value: string;
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
