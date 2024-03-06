import { defineStore } from "pinia";
import GetUser from "../graphql/user/queries.gql";
import { User } from "../entities/login";
import { router } from "../modules";

const id = "users";

const userStorage = {
  id: "",
  name: "",
  password: "",
  email: "",
  token: "",
};

export const useUsers = defineStore(id, {
  state: () => {
    return {
      stateUser: { ...userStorage },
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
    logout: () => {
      const user = useUsers();
      user.stateUser = userStorage;
      return router.push("/login");
    },
  },
  persist: true,
});
