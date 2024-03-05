import { defineStore } from "pinia";
import GetUser from "../graphql/user/queries.gql";
import { User, UserStorage } from "../entities/login";

const id = "users";

const StateUser: UserStorage = {
  id: "",
  name: "",
  password: "",
  email: "",
  token: "",
};

export const useUsers = defineStore(id, {
  state: () => {
    return {
      StateUser,
    };
  },
  getters: {},

  actions: {
    getUser: async (form: User) => {
      return await runQuery(GetUser, {
        name: form.labelInputName!,
        password: form.labelInputPassword,
        email: form.labelEmail,
      });
    },
  },
  persist: true,
});
