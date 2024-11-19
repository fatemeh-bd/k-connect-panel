import { TableColumn } from "react-data-table-component";

export interface TablePropsType {
  columns: TableColumn<{ [key: string]: any }>[];
  data: { [key: string]: any }[];
  header: { [key: string]: any }[];
}
