import { Certification } from "../../entities/certification";
export function extractImage(
  name: string,
  imgs: Certification[],
): string | unknown {
  const image = imgs.find((element) => element.name === name)?.image;
  if (image) {
    return image;
  }
}

export function getFirstImage(docSig: { name: string }[]) {
  return docSig[0]?.name as string;
}
