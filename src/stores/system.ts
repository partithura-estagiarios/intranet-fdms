import { defineStore } from "pinia";

const id = "system";

export const useSystem = defineStore(id, {
  state: () => {
    return {
      optionMenu: false,
    };
  },
  getters: {
    getSystemOption: (state) => {
      return state.optionMenu;
    },
  },
  actions: {
    setOptionMenu() {
      const systemStore = useSystem();
      systemStore.optionMenu = !systemStore.optionMenu;
    },
  },
});
