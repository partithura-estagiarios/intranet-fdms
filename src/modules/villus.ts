import { createClient, defaultPlugins } from "villus";
import { getEnvironmentVariable } from "../helpers";
type AfterQueryCallback = (
  result: any,
  { response }: { response: any },
) => void;

const url = getEnvironmentVariable("VITE_APP_ENDPOINT");

interface FetchOptions extends RequestInit {
  url?: string;
  headers: NonNullable<Record<string, string>>;
}

export const villus = createClient({
  use: [...defaultPlugins()],
  url,
});
