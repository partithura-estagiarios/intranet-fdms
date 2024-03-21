import { MaybeRef } from "@vueuse/core";
import { useQuery, useMutation } from "villus";
import { DocumentNode } from "graphql"; // Importe DocumentNode de uma biblioteca relacionada, como graphql

export async function runQuery<T>(
  query: MaybeRef<DocumentNode | string>,
  variables: Record<string, string> | null = null,
): Promise<T> {
  const { data } = await useQuery({
    query,
    variables,
    cachePolicy: "network-only",
  }).execute();
  return data as T;
}

export async function runMutation<T>(
  query: DocumentNode | string,
  variables: Record<string, string>,
): Promise<T> {
  const { data } = await useMutation(query).execute(variables);

  return data as T;
}
