import { defineStore } from "pinia";
export const server_express_url = getEnvironmentVariable(
  "VITE_URL_BACK_SERVER_EXPRESS_FOR_ARCHIVES",
);
import CreateFolderForInt from "../graphql/institutionalImgs/CreateFolderForInt.gql";
import ExcludeFolderForInt from "../graphql/institutionalImgs/ExcludeFolderForInt.gql";
import ExcludeFolderForCertification from "../graphql/certification/ExcludeFolderForCertification.gql";
interface Message {
  enum: boolean;
  message: string;
}

interface State {
  folders: string[];
  reload: boolean;
  certifications: string[];
  reloadCertification: boolean;
}

const id = "imgs";
export const useImgs = defineStore(id, {
  state: (): State => ({
    folders: [],
    certifications: [],
    reload: false,
    reloadCertification: false,
  }),
  getters: {
    refreshReload(state) {
      return (state.reload = !state.reload);
    },
    refreshCertificationsReload(state) {
      return (state.reloadCertification = !state.reloadCertification);
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
    setFoldersCertifications: (folderName: string[]) => {
      const imgsStorage = useImgs();
      imgsStorage.folders = [];
      folderName.forEach((val) => {
        imgsStorage.certifications.push(val);
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
      if (response.ok) {
        imgsStorage.refreshReload;
        return true;
      }
      return false;
    },
    insertFolder: async (folderName: string) => {
      const { createFolderForInt }: { createFolderForInt: Message } =
        await runMutation(CreateFolderForInt, {
          folder: folderName,
        });

      return createFolderForInt;
    },
    excludeFolder: async (path: String) => {
      const imgsStorage = useImgs();
      const { excludeFolderForInt }: { excludeFolderForInt: Message } =
        await runMutation(ExcludeFolderForInt, { folder: path });
      imgsStorage.refreshReload;
    },
    excludeCertification: async (path: String) => {
      const imgsStorage = useImgs();
      const {
        excludeFolderForCertification,
      }: { excludeFolderForCertification: Message } = await runMutation(
        ExcludeFolderForCertification,
        { folder: path },
      );
      imgsStorage.refreshCertificationsReload;
    },
  },
});
