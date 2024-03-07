import { createClient, defaultPlugins } from "villus";
import { getEnvironmentVariable } from "../helpers";
import { useUsers } from "../stores/user"; // Substitua pelo caminho correto para useUsers

const url = getEnvironmentVariable("VITE_APP_ENDPOINT");
function somePlugin({ afterQuery, useResult, operation }) {
  afterQuery((result, { response }) => {
    const error = response.body.errors[0].message;
    if (error.indexOf("token")) {
      const useStorage = useUsers();
      useStorage.logout();
    }
  });
}
function authPlugin({ opContext }: { opContext: FetchOptions }) {
  const { token } = useUsers().stateUser;

  if (token) {
    opContext.headers.Authorization = `Bearer ${token}`;
  }
}

interface FetchOptions extends RequestInit {
  url?: string;
  headers: NonNullable<Record<string, string>>;
}

export const villus = createClient({
  use: [authPlugin, somePlugin, ...defaultPlugins()],
  url,
});
