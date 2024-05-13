import { Files } from "../../../modules/graphql/graphql";
import { Anexo } from "../../../entities/files";
export function isEmpty(files: Files) {
  if (files.folders && files.folders.length > 0) {
    const folderNow = files.folders[0]?.folderNow;
    if (!files.archives || folderNow === "") {
      return true;
    }
  }
  return false;
}
