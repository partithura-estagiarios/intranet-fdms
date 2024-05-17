export interface Files {
  path: string | undefined;
  pdfs: string[] | undefined;
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
