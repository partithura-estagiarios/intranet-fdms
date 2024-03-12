export const inputsForScheduleRoom = [
  {
    stringsInfo: {
      name: "",
      email: "",
    },
    selectInfo: {
      options: ["SALA A", "SALA B", "SALA C", "SALA DE REUNIÃO"],
      rules: ["Reunião", "Emergência"],
    },
    numberInfo: {
      ramal: null,
      user_registration: null,
      total_people: null,
    },
    booleanInfos: {
      computer: false,
      projector: false,
      water: false,
      coffee: false,
    },
    dateInfos: {
      initial_time: null,
      final_time: null,
    },
  },
];
export const objectScheduleRoom = {
  user_created: {
    name: "",
    ramal_number: null,
    user_registration: null,
    email: "",
  },
  location: "",
  description: {
    rules: "",
    total_people: null,
  },
  initial_time: "",
  final_time: "",
  support: {
    computer: false,
    projector: false,
    water: false,
    coffee: false,
  },
};
export function verificaPropriedadesPreenchidas(objeto) {
  for (let propriedade in objeto) {
    if (objeto.hasOwnProperty(propriedade)) {
      if (
        objeto[propriedade] === undefined ||
        objeto[propriedade] === null ||
        objeto[propriedade] === ""
      ) {
        return false;
      }
    }
  }
  return true;
}
