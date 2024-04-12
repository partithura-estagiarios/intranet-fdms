export function resetFields(selectedFields: Record<string, string>) {
  for (const key in selectedFields) {
    selectedFields[key] = "";
  }
}
