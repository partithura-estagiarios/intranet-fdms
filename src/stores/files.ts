import { defineStore } from "pinia";
import { getEnvironmentVariable } from "../helpers";
import InsertFolders from "../graphql/folders/InsertFolders.gql";
import SearchPath from "../graphql/folders/SearchPath.gql";
import IsFolderChild from "../graphql/folders/IsFolderChild.gql";
const server_express_url = getEnvironmentVariable(
  "VITE_URL_BACK_SERVER_EXPRESS_FOR_ARCHIVES",
);

const id = "files";

export const useFiles = defineStore(id, {
  state: () => ({
    reload: false,
    folderTree: "",
    folder: "",
    folderChild: "",
  }),
  getters: {
    getReloadState: (state) => state.reload,
    getFolderTree: (state) => state.folderTree,
    getFolder: (state) => state.folder,
    getFolderChild: (state) => state.folderChild,
  },
  actions: {
    toggleReloadState: () => {
      const store = useFiles();
      store.reload = !store.reload;
    },
    toggleFolderTreeState: (folder: string) => {
      const store = useFiles();
      store.folderTree = folder;
    },
    toggleFolderState: (folder: string) => {
      const store = useFiles();
      store.folder = folder;
    },
    toggleFolderChildState: (folder: string) => {
      const store = useFiles();
      store.folderChild = folder;
    },
    displayPdf: async (filePath: string) => {
      try {
        const response = await fetch(
          `${server_express_url}/serve-pdf/${filePath}`,
        );
        if (response.ok) {
          const pdfUrl = URL.createObjectURL(await response.blob());
          return window.open(pdfUrl, "_blank");
        }
        console.error("Erro ao exibir PDF:", response.statusText);
      } catch (error) {
        console.error("Erro ao exibir PDF:", error);
      }
    },
    insertFile: async (folder: string, file: any) => {
      const { searchPath }: { searchPath: string } = await runQuery(
        SearchPath,
        { folder: folder.toString() },
      );
      if (typeof file === "string") {
        const { insertFolders }: { insertFolders: Boolean } = await runMutation(
          InsertFolders,
          {
            folder: file,
            path: folder,
          },
        );
        return insertFolders;
      }
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`${server_express_url}/inserir-arquivo`, {
        method: "POST",
        body: formData,
        headers: {
          "search-path": searchPath,
        },
      });
      return response.ok;
    },
    deleteFile: async (path: string, file: string) => {
      if (!file.includes(".")) {
        const { searchPath }: { searchPath: string } = await runQuery(
          SearchPath,
          { folder: file.toString() },
        );
        const { insertFolders }: { insertFolders: Boolean } = await runMutation(
          InsertFolders,
          {
            folder: file,
            path: searchPath.toString(),
            exclude: true,
          },
        );
        return insertFolders;
      }
      try {
        const { insertFolders }: { insertFolders: Boolean } = await runMutation(
          InsertFolders,
          {
            folder: file,
            path: path + "/" + file,
            exclude: true,
          },
        );
        return insertFolders;
      } catch (error) {
        return false;
      }
    },
    checkDirectory: async (file: string) => {
      if (!file.includes(".")) {
        const { isFolderChild }: { isFolderChild: string } = await runQuery(
          IsFolderChild,
          { folder: file },
        );
        return isFolderChild;
      }
      return false;
    },
  },
});
