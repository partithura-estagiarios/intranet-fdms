import { defineStore } from "pinia";
import GetUser from "../graphql/user/Login.gql";
import { User, UserStorage } from "../entities/login";

const id = "users";

const StateUser: UserStorage = {
  id: "",
  name: "",
  password: "",
  email: "",
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
});

export const profileStore = useUsers();
