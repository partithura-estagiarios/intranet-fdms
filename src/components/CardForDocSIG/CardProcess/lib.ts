export function getFileNameWithoutExtension(fileName: string): string {
  if (fileName.endsWith(".pdf")) {
    return fileName.slice(0, -4);
  }
  return fileName;
}
