import { createClient, defaultPlugins } from "villus";
import { getEnvironmentVariable } from "../helpers";
import { useUsers } from "../stores/user"; // Substitua pelo caminho correto para useUsers
type AfterQueryCallback = (
  result: any,
  { response }: { response: any },
) => void;

const url = getEnvironmentVariable("VITE_APP_ENDPOINT");
function somePlugin({ afterQuery }: { afterQuery: AfterQueryCallback }) {
  afterQuery(
    (result: any, { response }: { response: any }) => {
      const error = response.body.errors[0].message;
      if (error.includes("token")) {
        const useStorage = useUsers();
        useStorage.logout();
      }
    },
    { response: undefined },
  );
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
