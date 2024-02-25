import { MaybeRef } from "@vueuse/core";
import { useQuery, useMutation } from "villus";
export async function runQuery(
  query: MaybeRef<Document> | string,
  variables: Record<string, string> | null = null
): Promise<Record<string, string | number>> {
  const { data } = await useQuery({
    query,
    variables,
  }).execute();

  return data as Record<string, string | number>;
}

export async function runMutation(
  query: MaybeRef<Document>,
  variables: Record<string, string>
): Promise<Record<string, Record<string, string>>> {
  const { data } = await useMutation(query).execute(variables);

  return data as Record<string, Record<string, string>>;
}
