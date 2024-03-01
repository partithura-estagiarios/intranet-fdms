import { chunk } from "lodash";
export const columns = [
  {
    name: "name",
    label: "columns.name",
    field: "name",
    align: "left",
  },
  {
    name: "sector",
    label: "columns.sector",
    field: "sector",
    align: "center",
  },
  { name: "number", label: "columns.number", field: "number", align: "center" },
  {
    name: "icon",
    align: "right",
    field: "icon",
    label: "",
  },
];
export const maxRows = 8;
export function pagesForTable(ramais: Object[]) {
  const result = chunk(ramais, 8).length;
  return result;
}
export const firstPage = "1";
