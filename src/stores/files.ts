import { defineStore } from "pinia";
import { getEnvironmentVariable } from "../helpers";
import InsertFolders from "../graphql/folders/InsertFolders.gql";
import SearchPath from "../graphql/folders/SearchPath.gql";
const server_express_url = getEnvironmentVariable(
  "VITE_URL_BACK_SERVER_EXPRESS_FOR_ARCHIVES",
);

const id = "files";

export const useFiles = defineStore(id, {
  state: () => ({}),
  actions: {
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
        { folder: folder },
      );
      try {
        if (typeof file === "string") {
          const { insertFolders }: { insertFolders: Boolean } =
            await runMutation(InsertFolders, {
              folder: file,
              path: searchPath.toString(),
            });
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
      } catch (error) {
        console.error("Erro ao inserir arquivo:", error);
      }
    },
    deleteFile: async (path: string, file: any) => {
      if (!file.includes(".")) {
        const { searchPath }: { searchPath: string } = await runQuery(
          SearchPath,
          { folder: file },
        );
        try {
          const { insertFolders }: { insertFolders: Boolean } =
            await runMutation(InsertFolders, {
              folder: file,
              path: searchPath.toString(),
              exclude: true,
            });
          return insertFolders;
        } catch (error) {
          return false;
        }
      }
      try {
        const response = await fetch(`${server_express_url}/excluir-arquivo`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filePath: path, fileName: file }),
        });
        return response.ok;
      } catch (error) {
        console.error("Erro ao excluir o arquivo:", error);
        throw error;
      }
    },
  },
});
