import { defineStore } from "pinia";
import LoadSystems from "../graphql/system/queries.gql";
import DeleteSystem from "../graphql/system/DeleteSystem.gql";
import { router } from "../modules/router";

const id = "systems";
interface Sistema {
  system_id: number;
  icon: string;
  link: string;
  label: string;
  sublabel: string;
}
interface State {
  sistemas: Sistema[];
  openModalCeo: boolean;
  showBadgeExclusion: boolean;
}

export const useSystems = defineStore(id, {
  state: (): State => ({
    sistemas: [],
    openModalCeo: false,
    showBadgeExclusion: false,
  }),
  getters: {
    toogleBadgeExclusion(state) {
      return (state.showBadgeExclusion = !state.showBadgeExclusion);
    },
    getBadgeExclusion(state) {
      return state.showBadgeExclusion;
    },
    getSistemas(state) {
      return state.sistemas;
    },
  },
  actions: {
    goToRoute(rout: string) {
      const systemStorage = useSystems();
      if (rout.includes("https")) {
        return window.open(`${rout}`);
      }
      if (rout.includes("contatoCeo")) {
        return (systemStorage.openModalCeo = true);
      }
      return router.push(`${rout}`);
    },
    loadSystems: async (system: string) => {
      const systemStorage = useSystems();
      const { loadSystems }: { loadSystems: Sistema[] } = await runQuery(
        LoadSystems,
        {
          sistema: system,
        },
      );
      systemStorage.sistemas = loadSystems;
    },
    excludeSystemId: async (id: number) => {
      const systemStorage = useSystems();
      const { deleteSystem }: { deleteSystem: Sistema[] } = await runQuery(
        DeleteSystem,
        {
          systemId: id,
        },
      );
      systemStorage.loadSystems("gestao");
    },
  },
});
