import { MaybeRef } from "@vueuse/core";
import { useQuery, useMutation } from "villus";
import { DocumentNode } from "graphql"; // Importe DocumentNode de uma biblioteca relacionada, como graphql

const GRAPHQL_ERROR_MARKER = 9;

export async function runQuery<T>(
  query: MaybeRef<DocumentNode | string>,
  variables: Record<string, string> | null = null,
): Promise<T> {
  const { data, error } = await useQuery({
    query,
    variables,
    cachePolicy: "network-only",
  }).execute();
  if (error !== null) {
    negativeNotify(error.message.slice(GRAPHQL_ERROR_MARKER));
  }
  return data as T;
}

export async function runMutation<T>(
  query: DocumentNode | string,
  variables: Record<string, string>,
): Promise<T> {
  const { data, error } = await useMutation(query).execute(variables);
  if (error !== null) {
    negativeNotify(error.message.slice(GRAPHQL_ERROR_MARKER));
  }
  return data as T;
}
