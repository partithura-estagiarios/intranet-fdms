export function extractImage(
  name: string,
  imgs: { name: string; image: any }[],
) {
  return imgs.find((element: { name: string }) => element.name === name)?.image;
}

export function getFirstImage(docSig: { name: string }[]) {
  return docSig[0]?.name as string;
}
