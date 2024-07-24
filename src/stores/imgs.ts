import { defineStore } from "pinia";
export const server_express_url = getEnvironmentVariable(
  "VITE_URL_BACK_SERVER_EXPRESS_FOR_ARCHIVES",
);
import CreateFolderForInt from "../graphql/institutionalImgs/CreateFolderForInt.gql";
import ExcludeFolderForInt from "../graphql/institutionalImgs/ExcludeFolderForInt.gql";

import { Message } from "../modules/graphql/graphql";

interface State {
  folders: string[];
  reload: boolean;
}

const id = "imgs";
export const useImgs = defineStore(id, {
  state: (): State => ({
    folders: [],
    reload: false,
  }),
  getters: {
    refreshReload(state) {
      return (state.reload = !state.reload);
    },
  },
  actions: {
    setFoldersImgs: (folderName: string[]) => {
      const imgsStorage = useImgs();
      imgsStorage.folders = [];
      folderName.forEach((val) => {
        imgsStorage.folders.push(val);
      });
    },
    insertImg: async (path: string, file: any) => {
      const imgsStorage = useImgs();
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`${server_express_url}/upload-img`, {
        method: "POST",
        body: formData,
        headers: {
          "search-path": path,
        },
      });
      if (!response.ok) {
        return;
      }
      return imgsStorage.refreshReload;
    },
    insertFolder: async (folderName: string) => {
      const imgsStorage = useImgs();

      const { createFolderForInt }: { createFolderForInt: Message } =
        await runMutation(CreateFolderForInt, {
          folder: folderName,
        });
      return imgsStorage.refreshReload;
    },
    excludeFolder: async (path: String) => {
      const imgsStorage = useImgs();
      const { excludeFolderForInt }: { excludeFolderForInt: Message } =
        await runMutation(ExcludeFolderForInt, { folder: path });
      imgsStorage.refreshReload;
    },
  },
});
