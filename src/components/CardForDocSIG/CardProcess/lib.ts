export function getFileNameWithoutExtension(
  fileName: string | null | undefined,
): string {
  if (!fileName) {
    return ""; // Ou outra ação apropriada para lidar com valores nulos ou undefined
  }
  if (fileName.endsWith(".pdf")) {
    return fileName.slice(0, -4);
  }
  return fileName;
}
