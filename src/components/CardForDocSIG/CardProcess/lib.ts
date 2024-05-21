export function getFileNameWithoutExtension(
  fileName: string | null | undefined,
): string {
  if (!fileName) {
    return "";
  }
  if (fileName.endsWith(".pdf")) {
    return fileName.slice(0, -4);
  }
  return fileName;
}

export function separateMarOfPdf(fileName: string) {
  console.log(fileName.endsWith("MAR"));
}
