export function getFileNameWithoutExtension(fileName: string) {
  if (fileName.endsWith(".pdf")) {
    return fileName.slice(0, -4);
  }
  return fileName;
}
