import { createClient, defaultPlugins } from "villus";
import { getEnvironmentVariable } from "../helpers";

const url = "http://localhost:4000";

export const villus = createClient({
  use: [...defaultPlugins()],
  url,
});
