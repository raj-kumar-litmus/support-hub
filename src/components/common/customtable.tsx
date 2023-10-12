import { DataTable, DataTableProps } from "primereact/datatable";

const CustomTable = (props: DataTableProps<any>) => (
  <DataTable {...props}>{props.children}</DataTable>
);

export default CustomTable;
