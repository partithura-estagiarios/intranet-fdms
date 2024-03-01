export function extracImage(name, imgs) {
  return imgs.find((element) => element.name == name).image;
}
export function getFirstImage(docSig) {
  return docSig[0].name;
}
