export interface Files {
  archives: Archive[];
  folders: Folder[];
}
export interface Folder {
  folderNow: string;
  folderParent: string;
}

export interface Archive {
  path: string;
  name: string;
}
export interface FolderTree {
  id: number;
  name: string;
}

export interface Opts {
  label: string;
  value: string;
  path: string;
  name: string;
}
export interface Anexo {
  __key: string;
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  size: number;
  type: string;
  webkitRelativePath: string;
}
