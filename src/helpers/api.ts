import { MaybeRef } from "@vueuse/core";
import { useQuery, useMutation } from "villus";

export async function runQuery<T>(
  query: MaybeRef<Document | string>,
  variables: Record<string, string> | null = null,
): Promise<T> {
  const { data } = await useQuery({
    query,
    variables,
  }).execute();

  return data as T;
}

export async function runMutation<T>(
  query: MaybeRef<Document>,
  variables: Record<string, string>,
): Promise<T> {
  const { data } = await useMutation(query).execute(variables);

  return data as T;
}
