import { defineStore } from "pinia";
import { GrandParentFolder, ChildFolder } from "../entities/files";
import CreateFolder from "../graphql/folders/CreateFolder.gql";
import DeleteFolder from "../graphql/folders/DeleteFolder.gql";
export function trimFilePath(filePath: string): string {
  return filePath.replace(
    /^\/home\/partithura\/Projetos\/intranet-fdms\/archives-intranet-fdms\//,
    "",
  );
}
function isNewFileName(newName: string) {
  if (newName) {
    return newName + ".pdf";
  }
}
const server_express_url = getEnvironmentVariable(
  "VITE_URL_BACK_SERVER_EXPRESS_FOR_ARCHIVES",
);
interface Message {
  success: boolean;
  message: string;
}
interface State {
  folders: GrandParentFolder[];
  nameOfGrandParent: String;
  nameOfParent: String;
  nameOfChild: String;
  files: ChildFolder[];
  optionsGrandParent: String[];
  optionsParent: ChildFolder[];
  optionsChild: ChildFolder[];
  getFoldersAgain: boolean;
}
const id = "files";
export const useFiles = defineStore(id, {
  state: (): State => ({
    folders: [],
    nameOfGrandParent: "",
    nameOfParent: "",
    nameOfChild: "",
    files: [],
    optionsGrandParent: [],
    optionsParent: [],
    optionsChild: [],
    getFoldersAgain: false,
  }),
  getters: {
    foldersAgain: (state) => {
      return state.getFoldersAgain;
    },
    getFoldersGrandParent: (state) => {
      return state.folders;
    },
    getFoldersParent: (state) => {
      const pastaAvo = state.optionsParent.find(
        (pasta) => pasta.name === state.nameOfGrandParent,
      );
      if (pastaAvo) {
        return pastaAvo.subFolders;
      }
    },
    getFoldersChild: (state) => {
      const pastaAvo = state.optionsChild.find(
        (pasta) => pasta.name === state.nameOfParent,
      );
      if (pastaAvo) {
        return pastaAvo.subFolders;
      }
    },
    getFoldersFiles: (state) => {
      const pastaAvo = state.files.find(
        (pasta) => pasta.name === state.nameOfChild,
      );
      if (pastaAvo) {
        return pastaAvo.subFolders;
      }
    },
  },
  actions: {
    displayPdf: async (filePath: string) => {
      const file = trimFilePath(filePath);
      const response = await fetch(`${server_express_url}/serve-pdf/${file}`);
      if (response.ok) {
        const pdfUrl = URL.createObjectURL(await response.blob());
        return window.open(pdfUrl, "_blank");
      }
    },
    setAllFolders: (folders: GrandParentFolder[]) => {
      const store = useFiles();
      store.folders = folders;
      store.optionsGrandParent = loadAllFoldersGrandParent(store.folders);
      store.optionsParent = loadAllFoldersParent(store.folders);
      store.optionsChild = loadAllFoldersChild(store.folders);
      store.files = loadAllFiles(store.folders);
    },
    setNameFolderGP: (folderName: String) => {
      const store = useFiles();
      store.nameOfGrandParent = folderName;
      store.nameOfParent = "";
      store.nameOfChild = "";
    },
    setNameFolderP: (folderName: String) => {
      const store = useFiles();
      store.nameOfParent = folderName;
      store.nameOfChild = "";
    },
    setNameFolderC: (folderName: String) => {
      const store = useFiles();
      store.nameOfChild = folderName;
    },
    insertFolder: async (path: String, folderName: String) => {
      const store = useFiles();

      const { createFolder }: { createFolder: Message } = await runMutation(
        CreateFolder,
        { folder: folderName, path: path },
      );
      if (createFolder.success) {
        store.getFoldersAgain = createFolder.success;
        return createFolder.message;
      }
      return createFolder.message;
    },
    excludeFolder: async (path: String) => {
      const store = useFiles();
      const { deleteFolder }: { deleteFolder: Message } = await runMutation(
        DeleteFolder,
        { path: path },
      );
      if (deleteFolder.success) {
        store.getFoldersAgain = true;
        return deleteFolder.message;
      }
      return deleteFolder.message;
    },
    insertFile: async (newName: string, path: string, file: File) => {
      const store = useFiles();
      const formData = new FormData();
      formData.append("file", file, isNewFileName(newName));
      const response = await fetch(`${server_express_url}/upload`, {
        method: "POST",
        body: formData,
        headers: {
          "search-path": path,
        },
      });
      if (response.ok) {
        const data = await response.json();
        store.getFoldersAgain = true;
        return data.message;
      }
      const errorData = await response.json();
      return errorData.error;
    },
  },
});

function loadAllFoldersGrandParent(folders: GrandParentFolder[]) {
  const auxFolders = [];
  for (const folder of folders) {
    auxFolders.push(folder.name);
  }
  return auxFolders;
}
function loadAllFoldersParent(folders: GrandParentFolder[]) {
  const auxFolders: ChildFolder[] = [];

  for (const folder of folders) {
    const parentFolder = {
      name: folder.name,
      subFolders: folder.subFolders.map((subFolder) => subFolder.name),
    };

    auxFolders.push(parentFolder);
  }
  return auxFolders;
}
function loadAllFoldersChild(folders: GrandParentFolder[]) {
  const auxFolders: ChildFolder[] = [];

  for (const folder of folders) {
    for (const subFolder of folder.subFolders) {
      const childFolder = {
        name: subFolder.name,
        subFolders: subFolder.subFolders.map(
          (subSubFolder) => subSubFolder.name,
        ),
      };

      auxFolders.push(childFolder);
    }
  }
  return auxFolders;
}
function loadAllFiles(folders: GrandParentFolder[]) {
  const auxFolders = [];

  for (const folder of folders) {
    for (const subFolder of folder.subFolders) {
      for (const folderChild of subFolder.subFolders) {
        const childFolder = {
          name: folderChild.name,
          subFolders: folderChild.subFolders.map(
            (subSubFolder) => subSubFolder,
          ),
        };
        auxFolders.push(childFolder);
      }
    }
  }
  return auxFolders;
}
