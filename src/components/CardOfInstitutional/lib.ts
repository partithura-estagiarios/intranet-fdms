export function createPath(folders: any[]) {
  const result: { name: string; caminhos: string[] }[] = [];

  folders.forEach((folder) => {
    const { name, img } = folder;

    if (Array.isArray(img)) {
      const caminhos = img.map((imageName) => `${name}/${imageName}`);
      return result.push({ name, caminhos });
    }
    const caminho = `${name}/${img}`;
    return result.push({ name, caminhos: [caminho] });
  });
  return result;
}

export const server_express_url = getEnvironmentVariable(
  "VITE_URL_BACK_SERVER_EXPRESS_FOR_ARCHIVES",
);
