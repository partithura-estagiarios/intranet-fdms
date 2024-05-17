import { defineStore } from "pinia";
import { getEnvironmentVariable } from "../helpers";
import LoadFiles from "../graphql/folders/LoadFiles.gql";
import LoadFolders from "../graphql/folders/LoadFolders.gql";
import CreateFolder from "../graphql/folders/CreateFolder.gql";
import BuildPath from "../graphql/folders/BuildPath.gql";
import DeleteFolder from "../graphql/folders/DeleteFolder.gql";
import DeleteFile from "../graphql/folders/DeleteFile.gql";
import { Files } from "../entities/files";
const server_express_url = getEnvironmentVariable(
  "VITE_URL_BACK_SERVER_EXPRESS_FOR_ARCHIVES",
);

const id = "files";
function isNewFileName(newName: string) {
  if (newName) {
    return newName + ".pdf";
  }
}

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
      store.folder = "";
      store.folderChild = "";
    },
    toggleFolderState: (folder: string) => {
      const store = useFiles();
      store.folder = folder;
      store.folderChild = "";
    },
    toggleFolderChildState: (folder: string) => {
      const store = useFiles();
      store.folderChild = folder;
    },
    displayPdf: async (filePath: string) => {
      const response = await fetch(
        `${server_express_url}/serve-pdf/${filePath}`,
      );
      if (response.ok) {
        const pdfUrl = URL.createObjectURL(await response.blob());
        return window.open(pdfUrl, "_blank");
      }
    },
    insertFile: async (
      folderParent: string,
      file: any,
      novoNomeArquivo: string,
    ) => {
      const store = useFiles();
      const { buildPath }: { buildPath: string } = await runQuery(BuildPath, {
        folder: folderParent,
      });
      const formData = new FormData();

      formData.append("file", file, isNewFileName(novoNomeArquivo));
      await fetch(`${server_express_url}/upload`, {
        method: "POST",
        body: formData,
        headers: {
          "search-path": buildPath,
        },
      });
      store.toggleReloadState();
    },
    insertFolder: async (folderParent: string, folder: string) => {
      const store = useFiles();

      const { createFolder }: { createFolder: boolean } = await runMutation(
        CreateFolder,
        {
          folder: folder,
          folderParent: folderParent,
        },
      );
      if (!createFolder) {
        return createFolder;
      }
      store.toggleReloadState();
      return true;
    },
    loadFolders: async (folder: string) => {
      const { loadFolders }: { loadFolders: String[] } = await runQuery(
        LoadFolders,
        {
          folder: folder,
        },
      );
      return loadFolders;
    },
    loadArchives: async (folder: string) => {
      const { loadFiles }: { loadFiles: Files } = await runQuery(LoadFiles, {
        folder: folder,
      });
      return loadFiles;
    },
    excludeFolder: async (folder: string) => {
      const store = useFiles();
      await runMutation(DeleteFolder, {
        folder: folder,
      });
      store.toggleReloadState();
    },
    excludeFile: async (file: string) => {
      const store = useFiles();
      await runMutation(DeleteFile, {
        path: file,
      });
      store.toggleReloadState();
    },
  },
});
