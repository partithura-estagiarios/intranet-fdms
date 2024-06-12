import { ChildFolder } from "../../../entities/files";

export const indexOfGrandParent = 0;
export const indexOfParent = 1;
export const indexOfChild = 2;
export const indexOfFile = 3;
export const eliminateRepeats = 1;
export function changeOptions(folders: ChildFolder[], folderSelect: String) {
  const auxFolder = folders.find((folder) => folder.name === folderSelect);
  if (auxFolder) {
    return auxFolder.subFolders;
  }
}
export function changeFiles(folders: ChildFolder[], folderSelect: String) {
  const auxFolder = folders.find((folder) => folder.name === folderSelect);
  if (auxFolder) {
    const subFolders = auxFolder.subFolders.map((path) => {
      const parts = path.split("/");
      return parts[parts.length - 1];
    });
    return subFolders;
  }
}
export const isFolder = "action.addFolder";
export const isFile = "action.addFile";
export const isDeletion = "action.deleteItem";
export const firstIndex = 0;
