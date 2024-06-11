import { ChildFolder } from "../../../entities/files";

export const positionOfGrandParent = 0;
export const positionOfParent = 1;
export const positionOfChild = 2;
export const positionOfFile = 3;
export const eliminateRepeats = 1;
export function changeOptions(folders: ChildFolder[], folderSelect: String) {
  const pastaAvo = folders.find((pasta) => pasta.name === folderSelect);
  if (pastaAvo) {
    return pastaAvo.subFolders;
  }
}
export function changeFiles(folders: ChildFolder[], folderSelect: String) {
  const pastaAvo = folders.find((pasta) => pasta.name === folderSelect);
  if (pastaAvo) {
    const subFolders = pastaAvo.subFolders.map((path) => {
      const parts = path.split("/");
      return parts[parts.length - 1];
    });
    return subFolders;
  }
}
export const isFolder = "folder";
export const isFile = "file";
export const isDeletion = "delete";
export const styleTabs = "text-green bg-white rounded-borders";
export const success = "Success";
export const firsPosition = 0;
