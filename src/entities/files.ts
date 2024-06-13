export interface ChildFolder {
  folderGPName: String;
  name: String;
  subFolders: String[];
}
interface ParentFolder {
  name: String;
  subFolders: ChildFolder[];
}

export interface GrandParentFolder {
  name: String;
  subFolders: ParentFolder[];
}

export interface AuxFolder {
  name: String;
  subFolders: String[];
}
