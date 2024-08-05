export function splitFileName(filePath: string) {
  const matches = filePath.match(/\/([^/]+)$/);
  const fileName = matches ? matches[1] : "";

  const cleanedFileName = fileName.replace(/[-_]/g, "").replace(/\.pdf$/, "");

  const match = cleanedFileName.match(/^(MAR\d+)(.*)$/);
  if (match) {
    return match[1];
  }
}

export function getNameMar(filePath: string) {
  const matches = filePath.match(/\/([^/]+)$/);
  const fileName = matches ? matches[1] : "";

  const cleanedFileName = fileName.replace(/[-_]/g, "").replace(/\.pdf$/, "");

  const match = cleanedFileName.match(/^(MAR\d+)(.*)$/);
  if (match) {
    return match[2];
  }
}
