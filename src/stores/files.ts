import { defineStore } from "pinia";
import { getEnvironmentVariable } from "../helpers";
const backUrl = getEnvironmentVariable(
  "VITE_URL_BACK_SERVER_EXPRESS_FOR_ARCHIVES",
);
const backRouteReceivedArchives = getEnvironmentVariable(
  "VITE_ROUTE_FOR_ENVITY_ARCHIVES_FOR_SERVER_EXPRESS",
);
const backRouteGetArchives = getEnvironmentVariable(
  "VITE_ROUTE_FOR_GET_ARCHIVES",
);
const backRouteGetRoute = getEnvironmentVariable(
  "VITE_ROUTE_OF_LOCATION_ARCHIVES",
);
const id = "files";

export const useFiles = defineStore(id, {
  state: () => ({
    stateFiles: [],
  }),

  getters: {},
  actions: {
    fetchFileList: async () => {
      const response = await fetch(`${backUrl}${backRouteGetArchives}`);
      if (response.ok) {
        return await response.json();
      }
      throw new Error("Error fetching file list from the server");
    },
    sendFileToServer: async (file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${backUrl}${backRouteReceivedArchives}`, {
          method: "POST",
          body: formData,
          credentials: "include", // Se necessário, dependendo da configuração do CORS
        });

        if (response.ok) {
          const filename = await response.text();
          return console.log("Arquivo enviado com sucesso:", filename);
        }
        throw new Error("Erro ao enviar arquivo para o servidor");
      } catch (error) {
        console.error("Erro:", error.message);
      }
    },
    displayImage: async (filename) => {
      try {
        const response = await fetch(`${backUrl}/get-image/${filename}`);
        if (response.ok) {
          const imageUrl = URL.createObjectURL(await response.blob());
          return window.open(imageUrl, "_blank");
        }
        console.error("Erro ao exibir imagem:", response.statusText);
      } catch (error) {
        console.error("Erro ao exibir imagem:", error);
      }
    },
    searchFile: async (keyword) => {
      try {
        const response = await fetch(`${backUrl}/searchfile/${keyword}`);
        if (response.ok) {
          const data = await response.json();
          return data;
        }
        console.error("Erro ao buscar arquivo:", response.statusText);
      } catch (error) {
        console.error("Erro ao buscar arquivo:", error);
      }
    },
    deleteFile: async (filename) => {
      try {
        const response = await fetch(`${backUrl}/delete-file/${filename}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Arquivo excluído:", data);
        } else {
          console.error("Erro ao excluir arquivo:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao excluir arquivo:", error);
      }
    },
  },
});
