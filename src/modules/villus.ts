import { createClient, defaultPlugins } from "villus";
import { getEnvironmentVariable } from "../helpers";
import { useUsers } from "../stores/user"; // Substitua pelo caminho correto para useUsers

const url = getEnvironmentVariable("VITE_APP_ENDPOINT");

function authPlugin({ opContext }: { opContext: FetchOptions }) {
  const { token } = useUsers().StateUser;

  if (token) {
    opContext.headers.Authorization = `Bearer ${token}`;
  }
}

interface FetchOptions extends RequestInit {
  url?: string;
  headers: NonNullable<Record<string, string>>;
}

export const villus = createClient({
  use: [authPlugin, ...defaultPlugins()],
  url,
});
