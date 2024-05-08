export interface Files {
  archives: string[];
  folders: string[];
}
export interface Folder {
  folderNow: String;
  folderParent: String;
}

export interface Archive {
  path: String;
  name: String;
}
export interface FolderTree {
  id: number;
  name: string;
}
