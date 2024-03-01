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
export function spliceArray(ramais: Object[]) {
  return chunk(ramais, maxRows);
}
export const firstPage = 1;
