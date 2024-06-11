export function getLastPartOfPath(filePath: string): string {
  const matches = filePath.match(/\/([^/]+)$/);
  const fileName = matches ? matches[1] : null;
  return fileName ? fileName.replace(/\.pdf$/, "") : "";
}
