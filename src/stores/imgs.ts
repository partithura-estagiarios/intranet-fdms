import { defineStore } from "pinia";
export const server_express_url = getEnvironmentVariable(
  "VITE_URL_BACK_SERVER_EXPRESS_FOR_ARCHIVES",
);
import CreateFolderForInt from "../graphql/institutionalImgs/CreateFolderForInt.gql";
import ExcludeFolderForInt from "../graphql/institutionalImgs/ExcludeFolderForInt.gql";

import { Message } from "../modules/graphql/graphql";

interface State {
  folders: string[];
}

const id = "imgs";
export const useImgs = defineStore(id, {
  state: (): State => ({
    folders: [],
  }),
  getters: {},
  actions: {
    setFoldersImgs: (folderName: string[]) => {
      const imgsStorage = useImgs();
      imgsStorage.folders = [];
      folderName.forEach((val) => {
        imgsStorage.folders.push(val);
      });
    },
    insertImg: async (path: string, file: any) => {
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
        throw new Error(`Erro ao enviar imagem: ${response.statusText}`);
      }
    },
    insertFolder: async (folderName: string) => {
      const store = useFiles();

      const { createFolderForInt }: { createFolderForInt: Message } =
        await runMutation(CreateFolderForInt, {
          folder: folderName,
        });
    },
    excludeFolder: async (path: String) => {
      const { excludeFolderForInt }: { excludeFolderForInt: Message } =
        await runMutation(ExcludeFolderForInt, { folder: path });
    },
  },
});
