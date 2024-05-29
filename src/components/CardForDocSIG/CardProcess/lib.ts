interface LabelArchive {
  firstPart: string;
  restOfString: string;
}

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

export function separateMarOfPdf(fileName: string): LabelArchive {
  const firstSpaceIndex = fileName.indexOf(" ");
  const firstPart =
    firstSpaceIndex === -1 ? fileName : fileName.substring(0, firstSpaceIndex);
  const restOfString = fileName.slice(fileName.indexOf(" ") + 1);
  return { firstPart, restOfString };
}
