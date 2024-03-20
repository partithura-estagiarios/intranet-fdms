import { Certification } from "../../entities/certification";
export function extractImage(name: String, imgs: Certification[]) {
  return imgs.find((element) => element.name === name)?.image;
}

export function getFirstImage(docSig: { name: string }[]) {
  return docSig[0]?.name as string;
}
