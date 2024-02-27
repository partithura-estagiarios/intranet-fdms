import { DocSig } from "../../entities/docSig";
export function extracImage(docSig: DocSig) {
  const images = docSig.getDocSig.map((item) => item.image);
  return images;
}
