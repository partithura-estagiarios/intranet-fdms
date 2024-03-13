export function extractImage(name, imgs) {
  console.log("Name:", name);
  console.log("Imgs:", imgs);

  return imgs.find((element) => element.name === name)?.image;
}

export function getFirstImage(docSig: { name: string }[]) {
  return docSig[0]?.name as string;
}
