import { createClient, defaultPlugins } from "villus";
import { getEnvironmentVariable } from "../helpers";

const url = getEnvironmentVariable("VITE_APP_ENDPOINT");

export const villus = createClient({
  use: [...defaultPlugins()],
  url,
});
