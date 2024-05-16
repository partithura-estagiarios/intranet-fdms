export interface Files {
  path: String;
  pdfs: [String];
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
