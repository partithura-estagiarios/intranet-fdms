export interface ChildFolder {
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
